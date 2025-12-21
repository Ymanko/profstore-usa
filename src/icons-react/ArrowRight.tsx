import type { SVGProps } from 'react';

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 17 15' {...props}>
    <path
      fill='currentColor'
      d='M16.421 6.656a1 1 0 0 1 0 1.414l-6.364 6.364a1 1 0 1 1-1.414-1.414L14.3 7.363 8.643 1.706A1 1 0 0 1 10.057.292zM0 7.363v-1h15.714v2H0z'
    />
  </svg>
);
export default SvgArrowRight;
