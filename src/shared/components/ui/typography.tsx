import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

import type * as React from 'react';

const typographyVariants = cva('text-balance font-montserrat', {
  variants: {
    variant: {
      // Hero Headings (40px desktop, 32px mobile)
      hero: 'text-[32px] leading-[40px] font-bold md:text',

      // Page Titles (32px)
      h1: 'text-[32px] leading-[40px] font-bold',

      // Section Titles / Product Titles (18px)
      h2: 'font-bold text-3xl',

      // Card Titles (18px)
      h3: 'text-lg font-normal',

      // Mobile Menu (17px)
      h4: 'text-[17px] font-light',

      // Body Text (default)
      body: 'text-base leading-6 font-normal',

      // Body Large (18px)
      'body-lg': 'text-lg leading-8 font-normal',

      // Description / Small Text (14px)
      small: 'text-sm leading-5 font-normal',

      // Links / Navigation (500 weight)
      link: 'text-base leading-6 font-normal',

      // Button Text
      button: 'text-lg leading-[22px] font-normal',

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
