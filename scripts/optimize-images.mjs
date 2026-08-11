import sharp from 'sharp';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const IS_VARIANT = /\.(thumb|card)\.webp$/i;

/** Full-size ceiling. The project modal never renders wider than ~1050px, so
 *  1600 already covers a 1.5x display without hoarding decoded bitmap. */
const MAX_WIDTH = 1600;

/** Assets that are never rendered near full size — capped individually. */
const CAPS = {
  'DevFelloShip.png': 512,
  'EducarMais.webp': 640,
  'og-image-v6.png': 1200,
  'x-card.png': 1200,
  'imagem profissional.jpg': 900,
  'MMIcon.png': 400,
  'Tainan Fidelis.jpeg': 400,
};

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (SOURCE_EXT.has(path.extname(entry.name).toLowerCase()) && !IS_VARIANT.test(entry.name)) out.push(p);
  }
  return out;
}

async function isStale(source, derived) {
  try {
    return (await stat(source)).mtimeMs > (await stat(derived)).mtimeMs;
  } catch {
    return true;
  }
}

async function encodeAtWidth(buffer, width, ext) {
  const base = sharp(buffer).resize({ width, withoutEnlargement: true, kernel: 'lanczos3' });
  if (ext === '.png') {
    const [plain, palette] = await Promise.all([
      base.clone().png({ compressionLevel: 9, effort: 10 }).toBuffer(),
      base.clone().png({ compressionLevel: 9, effort: 10, palette: true, quality: 92, dither: 0.5 }).toBuffer(),
    ]);
    return palette.length < plain.length ? palette : plain;
  }
  if (ext === '.webp') return base.webp({ quality: 86, effort: 6 }).toBuffer();
  return base.jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

let downscaled = 0;
for (const file of await walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  const cap = CAPS[rel] ?? MAX_WIDTH;
  const buffer = await readFile(file);
  const { width } = await sharp(buffer).metadata();
  if (!width || width <= cap) continue;
  await writeFile(file, await encodeAtWidth(buffer, cap, path.extname(file).toLowerCase()));
  console.log(`redimensionado ${width} -> ${cap}  ${rel}`);
  downscaled++;
}

// Variantes pequenas: a tira de miniaturas renderiza a 64x48 e os cards a ~380px.
let variants = 0;
for (const file of await walk(path.join(ROOT, 'projects'))) {
  const buffer = await readFile(file);
  for (const [suffix, width, quality] of [['thumb', 192, 74], ['card', 800, 80]]) {
    const dest = file.replace(/\.(png|jpe?g|webp)$/i, `.${suffix}.webp`);
    if (!(await isStale(file, dest))) continue;
    await writeFile(dest, await sharp(buffer)
      .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ quality, effort: 6 })
      .toBuffer());
    variants++;
  }
}

console.log(`\n${downscaled} originais redimensionados | ${variants} variantes geradas`);
