import { ProductTitle } from '@/features/product/components/product-tools';
import { ProductDetailsAnchor } from '@/features/product/types/product.types';
import { Typography } from '@/shared/components/ui/typography';

export function ProductDescription() {
  return (
    <>
      <ProductTitle className='mb-5' id={ProductDetailsAnchor.Description}>
        Detailed description
      </ProductTitle>

      <div className='space-y-5'>
        <Typography>
          The Quamar CE/1 inox bar blender is a professional, budget-friendly piece of equipment that combines an
          optimal price/quality ratio with an elegant design and meticulous attention to detail. In addition, the
          blender is equipped with a powerful and quiet motor.
        </Typography>
        <Typography>Colors: Silver-gray Stainless steel cone-shaped milkshake jug, stainless steel bowl</Typography>
        <Typography>Body: ABS</Typography>
        <Typography>Blades: Stainless steel</Typography>
        <Typography>Jug capacity: 1 liter</Typography>
        <Typography>Switch: Two-speed</Typography>
        <Typography>
          Discover Vitamix Explorian E310. The entry-level blender in the Explorian Series that expertly balances
          affordability with professional-grade performance. With a 2-horsepower motor, Explorian E310 effortlessly
          breaks down everything from fibrous greens to frozen fruit and nuts, allowing you to create anything from
          chunky salsas to silky smoothies. Its durable metal drive system ensures longevity. Laser-cut, stainless-steel
          blades deliver consistent results. Take control of recipes with intuitive Variable Speed Control. The Pulse
          Function lets you customize every blend. The full-container blending capacity means you can pulverize an
          entire batch at once and conveniently add more ingredients through the lid as you go. More than a shake and
          smoothie maker, you can make hot soup in minutes using only friction heat to bring ingredients to serving
          temperature. Explorian E310 is an accessible choice for home chefs looking to upgrade their kitchen appliances
          and enjoy legendary Vitamix quality. Vitamix blenders last up to 10x longer than an average blender. (Data
          gathered through a Vitamix study which compared Vitamix Ascent and Explorian Series blenders against a select
          blender model determined to be average. Analysis completed in August of 2022.)
        </Typography>
      </div>
    </>
  );
}
