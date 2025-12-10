export function getPathAfterCom(url: string) {
  const parsed = new URL(url);
  return parsed.pathname;
}
