'use client';

import * as React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#FF5F00] focus:outline-none focus:ring-2 focus:ring-[#FF5F00]/20 ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';
