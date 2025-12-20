import Link from 'next/link';
import React from 'react';

export const Email = () => {
  return (
    <Link
      href='mailto:office@prof-store.com.ua'
      className='text-accent hover:text-accent font-montserrat flex text-sm font-light transition-colors duration-300 md:items-center md:gap-2'
    >
      office@prof-store.com.ua
    </Link>
  );
};
