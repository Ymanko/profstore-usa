'use client';

import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Typography } from "../ui/Typography";

type PopularProductBannerProps = {
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  saleLabel?: string;
  description: string;
  className?: string
};

export function PopularProductBanner({
  title,
  image,
  price,
  oldPrice,
  saleLabel,
  description,
  className
}: PopularProductBannerProps) {
  return (
    <div className={cn(" relative flex flex-col gap-3 max-w-[435px] h-full rounded-[20px] bg-surface-default p-5 shadow-sm", className)}>
      <div className="absolute inset-0 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative flex items-center justify-between gap-4">
        <Typography variant="h1" as='h3' className="text-[25px] leading-tight text-foreground">
          {title}
        </Typography>

        {saleLabel && (
          <button
            className="
                relative inline-flex items-center gap-6
                px-4 py-3 text-xs font-semibold
                rounded-[10px]
                bg-[linear-gradient(120deg,var(--foreground)_50%,var(--secondary)_50%)]
                "
          >
            <Typography variant='small' as='span' className='font-medium text-white text-center leading-[17px]'>
              Sale
            </Typography>
            <Typography variant='small' as='span' className='font-medium text-white text-center leading-[17px]'>
              55%
            </Typography>
          </button>
        )}
      </div>


      <div className="relative flex flex-col gap-5 justify-between items-start pl-37.5">
        {/* <div className="pt-3.5"> */}
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-3xl font-extrabold leading-tight text-foreground">
            {price.toLocaleString()}$
          </span>

          {oldPrice && (
            <span className="text-xl font-bold text-[#9f9f9f] leading-[1.2]">
              {oldPrice.toLocaleString()}$
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <Typography
          variant="body"
          className="mb-5 font-light text-[#9f9f9f] leading-tight"
        >
          {description}
        </Typography>
        <Button size='lg' className={cn('h-13.5 py-3 has-[>svg]:pr-[30px] gap-3.5 hover:text-accent bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)]')}>
          <Icon name='shoppingCart' className='shrink-0 size-6' width='24' height='24' />
          <span className="h-full w-[1px] bg-[#FFFFFF66]"></span>
          <Typography variant='h3' as='span' className='font-medium'>
            Basket
          </Typography>
        </Button>

        {/* DOTS */}
        {/* <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="h-2 w-2 rounded-full bg-gray-800" />
        </div> */}
        {/* </div> */}
      </div>
    </div >
  );
}
