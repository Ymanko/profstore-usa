import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M9 11a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0zM14 10a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M8.532 1a5 5 0 0 0-4.961 5.62L5.29 20.372A3 3 0 0 0 8.266 23h7.47a3 3 0 0 0 2.976-2.628l1.72-13.752A5 5 0 0 0 15.47 1zm-2.83 4a3 3 0 0 1 2.83-2h6.938a3 3 0 0 1 2.83 2zm-.068 2 1.64 13.124a1 1 0 0 0 .992.876h7.47a1 1 0 0 0 .992-.876L18.368 7z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgTrash;
