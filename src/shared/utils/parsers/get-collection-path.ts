export function getCollectionPath(url: string): string {
  const pathname = new URL(url).pathname;
  const collectionsIndex = pathname.indexOf('/collections/');

  try {
    if (collectionsIndex !== -1) {
      const pathAfterCollections = pathname.substring(collectionsIndex + '/collections'.length);
      return pathAfterCollections || '/';
    }

    return pathname;
  } catch {
    return pathname;
  }
}
