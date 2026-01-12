type UseRatingProps = ('full' | 'half' | 'empty')[];

export function useRating(rating: number): UseRatingProps {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return [...Array(fullStars).fill('full'), ...(hasHalfStar ? ['half'] : []), ...Array(emptyStars).fill('empty')];
}
