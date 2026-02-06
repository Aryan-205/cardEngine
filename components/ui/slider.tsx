'use client';

import * as React from 'react';

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  label?: string;
  valueDisplay?: string;
  className?: string;
};

export function Slider({
  value,
  onValueChange,
  max = 100,
  min = 0,
  step = 1,
  label,
  valueDisplay,
  className = '',
}: SliderProps) {
  const v = value[0] ?? min;
  return (
    <div className={`space-y-1 ${className}`}>
      {(label || valueDisplay) && (
        <div className="flex justify-between text-sm text-gray-600">
          {label && <span>{label}</span>}
          {valueDisplay != null && <span>{valueDisplay}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onValueChange([Number(e.target.value)])}
        className="w-full h-2 rounded-lg appearance-none bg-gray-200 accent-[#FF5F00]"
      />
    </div>
  );
}
