import React from 'react';
import { Chivo_Mono } from 'next/font/google';

const chivoMono = Chivo_Mono({ subsets: ['latin'] });

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={`text-4xl font-bold text-center text-yellow-300 ${chivoMono.className}`}
    >
      {children}
    </h1>
  );
}
