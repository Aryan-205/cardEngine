'use client';

import * as React from 'react';

export function GlassInputWrapper({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white/80 ${className}`}>
      {children}
    </div>
  );
}
