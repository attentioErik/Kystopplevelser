export function uc(url: string, opts: { width?: number; quality?: 'smart' | 'lighter' | 'normal' | 'better' | 'best' } = {}): string {
  if (!url.includes('ucarecdn.com')) return url;
  const { width, quality = 'smart' } = opts;
  const transforms: string[] = ['-/format/auto', `-/quality/${quality}`];
  if (width) transforms.push(`-/resize/${width}x`);

  const match = url.match(/^(https?:\/\/ucarecdn\.com\/[^/]+)\/?(.*)$/);
  if (!match) return url;
  const [, base, rest] = match;
  const filename = rest.replace(/\/$/, '');
  const opsPath = transforms.join('/') + '/';
  return filename ? `${base}/${opsPath}${filename}` : `${base}/${opsPath}`;
}

// next/image loader for crisp graphics (logos): Uploadcare resizes per srcset width at best quality.
export function ucSharpLoader({ src, width }: { src: string; width: number }): string {
  return uc(src, { width, quality: 'best' });
}
