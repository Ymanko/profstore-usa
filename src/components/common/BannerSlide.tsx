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
        // Базовые стили контейнера
        "relative w-full aspect-[1/1.23] overflow-hidden rounded-3xl bg-brand-section-bg",
        // Отступы и размеры:
        // Mobile: фиксированная высота не обязательна, контент толкает, но добавим min-h для красоты
        "flex flex-col md:flex-row items-center justify-between",
        "pt-7.5 pb-0 px-3.5 md:py-0 md:px-0", // Mobile padding vs Desktop reset
        className
      )}
    >

      <div className="flex flex-col items-center md:items-start text-center md:text-left w-fulzl md:w-1/2 md:pr-12 xl:pr-20">
        {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-primary-dark tracking-tight leading-tight mb-2 md:mb-4">
          {title}
        </h2> */}
        <Typography
          variant="h1"
          as='h3'
          className="mb-3.5 text-[25px] leading-tight font-extrabold text-[#3a6f43] uppercase"
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

      {/* Блок 2: Изображение
          Order-2 на мобильном (снизу), Order-1 на десктопе (слева)
      */}
      <div className="relative w-full h-full mt-2.5 z-10 order-2 md:order-1 md:w-1/2 md:h-full flex items-end justify-center md:justify-start md:mt-0">
        <div className="absolute w-full top-0 aspect-square rounded-[50%] bg-[#d9d9d9]"></div>
        <div className="absolute top-0 w-full h-full md:absolute md:inset-0 md:left-4 lg:left-8 top-4 md:top-auto flex items-end">
          {/* Важно: object-contain, чтобы картинка не обрезалась.
              object-bottom - прижимает к низу.
           */}
          <Image
            src={imageSrc}
            alt="Professional Kitchen Equipment"
            fill
            className="object-contain object-bottom md:object-left-bottom drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Так как это баннер, лучше грузить сразу
          />
        </div>
      </div>
    </div>
  );
};