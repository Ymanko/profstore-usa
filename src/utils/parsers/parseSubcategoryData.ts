type ParsedSubCategoryData = { title: string; image: string };

export function parseSubCategoryData(value: string): ParsedSubCategoryData {
  const [title, image] = value.split(':i:');
  return { title: title?.trim() ?? '', image: image?.trim() ?? '' };
}
