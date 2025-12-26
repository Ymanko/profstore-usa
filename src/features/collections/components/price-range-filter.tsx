'use client';

import { useCallback, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';

import type { FC } from 'react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  onPriceChange?: (min: number, max: number) => void;
}

export const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ min, max, currentMin, currentMax, onPriceChange }) => {
  // Store original range to keep slider range constant
  const [originalMin] = useState(min);
  const [originalMax] = useState(max);

  // Track if user is actively interacting
  const [isInteracting, setIsInteracting] = useState(false);

  // Local state for temporary values during interaction
  const [localMin, setLocalMin] = useState(currentMin ?? min);
  const [localMax, setLocalMax] = useState(currentMax ?? max);

  // Use props when not interacting, local state when interacting
  const displayMin = isInteracting ? localMin : (currentMin ?? originalMin);
  const displayMax = isInteracting ? localMax : (currentMax ?? originalMax);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsInteracting(true);
      const value = Number(e.target.value);
      const newMin = Math.min(value, displayMax);
      setLocalMin(newMin);
    },
    [displayMax],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsInteracting(true);
      const value = Number(e.target.value);
      const newMax = Math.max(value, displayMin);
      setLocalMax(newMax);
    },
    [displayMin],
  );

  const handleSliderInput = useCallback((values: number[]) => {
    setIsInteracting(true);
    setLocalMin(values[0]);
    setLocalMax(values[1]);
  }, []);

  const handleBlur = useCallback(() => {
    setIsInteracting(false);
    onPriceChange?.(displayMin, displayMax);
  }, [displayMin, displayMax, onPriceChange]);

  const handleThumbDragEnd = useCallback(() => {
    setIsInteracting(false);
    onPriceChange?.(displayMin, displayMax);
  }, [displayMin, displayMax, onPriceChange]);

  return (
    <div className='space-y-4'>
      <Typography variant='bold'>Price</Typography>

      <div className='grid grid-cols-2 gap-3'>
        <Input
          type='number'
          value={displayMin}
          onChange={handleMinChange}
          onBlur={handleBlur}
          min={originalMin}
          max={originalMax}
          className='bg-white text-center'
        />
        <Input
          type='number'
          value={displayMax}
          onChange={handleMaxChange}
          onBlur={handleBlur}
          min={originalMin}
          max={originalMax}
          className='bg-white text-center'
        />
      </div>

      <RangeSlider
        min={originalMin}
        max={originalMax}
        value={[displayMin, displayMax]}
        onInput={handleSliderInput}
        onThumbDragEnd={handleThumbDragEnd}
      />
    </div>
  );
};
