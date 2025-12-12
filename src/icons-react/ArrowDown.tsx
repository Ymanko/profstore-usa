import * as React from 'react';

import type { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 0 0-1.414-1.415l-4.186 4.186a1 1 0 0 1-1.414 0L7.121 9.71a1 1 0 0 0-1.414 0'
    />
  </svg>
);
export default SvgArrowDown;
