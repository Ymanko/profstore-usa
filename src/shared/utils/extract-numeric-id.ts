export function extractNumericId(gid: string): number {
  const parts = gid.split('/');
  return Number(parts[parts.length - 1]);
}
