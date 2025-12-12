import * as React from 'react';

import type { SVGProps } from 'react';
const SvgMortarboard = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12.45 3.078a1 1 0 0 0-.9 0l-11 5.53a1 1 0 0 0-.002 1.785L5 12.646V17a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4.365l3-1.511V14a1 1 0 1 0 2 0V9.63c0-.423-.16-.82-.558-1.019zM12 5.09 3.22 9.504l8.754 4.43 8.795-4.43zM7 17v-3.341l4.522 2.288a1 1 0 0 0 .901.001L17 13.643V17a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgMortarboard;
