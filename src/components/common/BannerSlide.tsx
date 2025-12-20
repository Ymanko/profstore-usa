import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";


// Путь к твоему shadcn button

interface BannerSlideProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  imageSrc: string; // Ссылка на прозрачное PNG изображение кухни
  onButtonClick?: () => void;
  className?: string;
}

export const BannerSlide: React.FC<BannerSlideProps> = ({
  title = "COMPLEX EQUIPMENT",
  subtitle = "professional kitchen",
  buttonText = "Catalog",
  imageSrc,
  onButtonClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-245 h-102 overflow-hidden rounded-[20px] bg-brand-section-bg",
        "flex flex-col md:flex-row items-center justify-end",
        "p-7.5", // Mobile padding vs Desktop reset
        className
      )}
    >
      <div className="absolute z-0 top-0 w-full h-full md:inset-0">
        <Image
          src={imageSrc}
          alt="Professional Kitchen Equipment"
          fill
          className="object-cover object-bottom md:object-left-bottom drop-shadow-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority // Так как это баннер, лучше грузить сразу
        />
      </div>
      <div className="relative flex flex-col items-center md:items-start text-center md:text-left w-fulzl">
        {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-primary-dark tracking-tight leading-tight mb-2 md:mb-4">
          {title}
        </h2> */}
        <Typography
          variant="h1"
          as="h3"
          className="
            mb-3.5
            text-[25px] leading-tight
            font-extrabold
            text-[#3a6f43]
            uppercase

            md:max-w-80 md:text-[45px] md:leading-[1.22]
            md:max-w-97 lg:text-[55px] lg:leading-[1.22]
          "
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          className="mb-5 leading-tight text-center text-[#1e1e1e]"
        >
          {subtitle}
        </Typography>

        <Button
          onClick={onButtonClick}
          className="min-w-59 bg-secondary hover:bg-secondary/90 text-white font-medium text-lg px-16 py-4 h-auto rounded-lg shadow-sm transition-all hover:scale-105"
        >
          {buttonText}
        </Button>
      </div>

    </div>
  );
};