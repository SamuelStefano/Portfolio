/** Resume PDF that matches the site language: EN gets the English résumé, PT/ES the Portuguese one. */
export const resumeHref = (language: string | undefined) =>
  (language ?? 'pt').startsWith('en') ? '/resume-en.pdf' : '/curriculo.pdf';
