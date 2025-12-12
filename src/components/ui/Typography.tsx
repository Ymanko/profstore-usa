import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type * as React from 'react';

const typographyVariants = cva('text-balance', {
  variants: {
    variant: {
      // Hero Headings (40px desktop, 32px mobile)
      hero: 'font-montserrat text-[32px] leading-[40px] font-bold md:text-[40px] md:leading-[48px]',

      // Page Titles (32px)
      h1: 'font-montserrat text-[32px] leading-[40px] font-bold',

      // Section Titles / Product Titles (18px)
      h2: 'font-montserrat text-lg font-semibold leading-6',

      // Card Titles (18px)
      h3: 'font-montserrat text-lg font-semibold',

      // Mobile Menu (17px)
      h4: 'font-montserrat text-[17px] font-light',

      // Body Text (default)
      body: 'font-inter text-base leading-6 font-normal',

      // Body Large (18px)
      'body-lg': 'font-inter text-lg leading-8 font-normal',

      // Description / Small Text (14px)
      small: 'font-inter text-sm leading-5 font-normal',

      // Links / Navigation (500 weight)
      link: 'font-montserrat text-base leading-6 font-medium',

      // Button Text
      button: 'font-montserrat text-lg leading-[22px] font-normal',

      // Muted Text
      muted: 'font-inter text-sm leading-5 font-normal text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
  children: React.ReactNode;
}

function Typography({ className, variant, as: Component = 'p', ...props }: TypographyProps) {
  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />;
}

export { Typography, typographyVariants };
