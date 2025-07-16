'use client';
import React from 'react';

export default function BarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#378410" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h16v2H4V3zm1 4h2v10h2V7h2v14h2V7h2v10h2V7h2v14h2V7h1v2H4V7z" />
    </svg>
  );
}