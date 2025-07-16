'use client';
import React from 'react';

export default function OvenIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#378410" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h16v18H4V3zm2 2v2h12V5H6zm0 4v10h12V9H6z" />
    </svg>
  );
}