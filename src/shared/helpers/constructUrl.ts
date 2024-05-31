export function constructUrlWithCurrentDomain(path: string): string {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/${path}`;
}
