// Prefix public asset paths so the static export also works under a GitHub
// Pages repository subpath (NEXT_PUBLIC_BASE_PATH=/repo-name).
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path: string) {
  if (/^https?:/.test(path)) return path;
  return `${base}${path}`;
}
