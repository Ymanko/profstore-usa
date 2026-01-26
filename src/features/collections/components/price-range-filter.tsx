'use client';

import { useCallback, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useUpdateEffect } from 'react-use';

import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';

interface PriceRangeFilterProps {
  baseMin: number;
  baseMax: number;
  currentMin?: number;
  currentMax?: number;
  onPriceChange?: (min: number, max: number) => void;
}

export function PriceRangeFilter({ baseMin, baseMax, currentMin, currentMax, onPriceChange }: PriceRangeFilterProps) {
  // Local state to track current values from slider
  const [minValue, setMinValue] = useState(currentMin ?? baseMin);
  const [maxValue, setMaxValue] = useState(currentMax ?? baseMax);

  // Update local state when props change (after initial mount)
  useUpdateEffect(() => {
    setMinValue(currentMin ?? baseMin);
    setMaxValue(currentMax ?? baseMax);
  }, [currentMin, currentMax, baseMin, baseMax]);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const newMin = Math.min(value, maxValue);
      setMinValue(newMin);
    },
    [maxValue],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const newMax = Math.max(value, minValue);
      setMaxValue(newMax);
    },
    [minValue],
  );

  const handleSliderInput = useCallback((values: number[]) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
  }, []);

  const handleBlur = useCallback(() => {
    onPriceChange?.(minValue, maxValue);
  }, [minValue, maxValue, onPriceChange]);

  const handleThumbDragEnd = useCallback(() => {
    onPriceChange?.(minValue, maxValue);
  }, [minValue, maxValue, onPriceChange]);

  return (
    <div className='space-y-4'>
      <Typography variant='bold'>Price</Typography>

      <div className='grid grid-cols-2 gap-3'>
        <Input
          type='number'
          value={minValue}
          onChange={handleMinChange}
          onBlur={handleBlur}
          min={baseMin}
          max={baseMax}
          className='bg-white text-center'
        />
        <Input
          type='number'
          value={maxValue}
          onChange={handleMaxChange}
          onBlur={handleBlur}
          min={baseMin}
          max={baseMax}
          className='bg-white text-center'
        />
      </div>

      <RangeSlider
        value={[minValue, maxValue]}
        min={baseMin}
        max={baseMax}
        onInput={handleSliderInput}
        onThumbDragEnd={handleThumbDragEnd}
      />
    </div>
  );
}
