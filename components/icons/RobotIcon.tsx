'use client';
import React from 'react';

export default function RobotIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#378410" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2h6v2H9V2zm-5 5h16v10H4V7zm2 2v6h12V9H6zm2 8h8v2H8v-2z" />
    </svg>
  );
}