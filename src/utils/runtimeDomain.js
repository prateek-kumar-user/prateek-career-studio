import site from '../content/site.json';

export function getRuntimeDomain() {
  if (typeof window === 'undefined') return site.domain;

  const host = window.location?.host;
  if (!host) return site.domain;

  return host
    .replace(/^www\./i, '')
    .replace(/:\d+$/, '')
    .trim() || site.domain;
}
