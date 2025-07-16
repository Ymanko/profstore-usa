'use client';
import React from 'react';

export default function RefrigeratorIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#378410" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2h12a1 1 0 011 1v18a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v6h10V4H7zm0 8v8h10v-8H7zm2 1h2v2H9v-2z" />
    </svg>
  );
}