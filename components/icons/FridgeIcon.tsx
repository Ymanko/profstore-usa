'use client';
import React from 'react';

export default function FridgeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#378410" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2h12v20H6V2zm2 2v5h2V4H8zm0 7v9h8v-9H8z" />
    </svg>
  );
}