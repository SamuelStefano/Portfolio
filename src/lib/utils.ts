import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Screenshots ship at 1600px. Rendering them in a 64px strip or a 380px card
 *  costs megabytes of decoded bitmap each, so point small surfaces at the
 *  pre-generated siblings instead. Callers should fall back to the original
 *  `onError` in case a variant is missing. */
const variant = (suffix: string) => (url: string) =>
  url.replace(/\.(png|jpe?g|webp)$/i, `.${suffix}.webp`);

/** 192px — gallery thumbnail strip */
export const thumbSrc = variant('thumb');

/** 800px — project grid cards and carousels */
export const cardSrc = variant('card');



