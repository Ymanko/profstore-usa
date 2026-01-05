export function getMenuItemIcon(title: string): string | null {
  const iconMatch = title.match(/:i:(.+)$/);
  return iconMatch ? iconMatch[1] : null;
}
