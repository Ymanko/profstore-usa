export function getCleanTitle(title: string): string {
  return title.replace(/:i:.+$/, '').trim();
}
