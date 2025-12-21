import type { SVGProps } from 'react';
const SvgCheckmarkSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 22 22' {...props}>
    <circle cx={11} cy={11} r={10.5} stroke='#579040' />
    <path
      fill='#579040'
      d='M16.5 7.34a.786.786 0 0 0-1.111 0l-5.693 5.692a.786.786 0 0 1-1.11 0l-1.998-1.997a.786.786 0 0 0-1.11 1.111l2 1.996c.921.919 2.412.918 3.331-.002L16.5 8.45a.786.786 0 0 0 0-1.11'
    />
  </svg>
);
export default SvgCheckmarkSmall;
