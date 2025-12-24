export function getLastSegment(url: string): string {
  const segments = url.split('/');
  return segments[segments.length - 1];
}
