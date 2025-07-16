// components/icons/FacebookIcon.tsx
import React from 'react';

export const FacebookIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="fbGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4C82F7" />
        <stop offset="100%" stopColor="#153CA8" />
      </linearGradient>
    </defs>

    {/* Обвідне коло */}
    <circle cx="512" cy="512" r="480" stroke="url(#fbGradient)" strokeWidth="60" fill="none" />

    {/* Літера F */}
    <path
      d="M562 320h84v-130c-15-2-45-5-85-5-84 0-141 51-141 144v91h-95v123h95v314h124V543h104l16-123h-120v-77c0-36 10-61 58-61z"
      fill="url(#fbGradient)"
    />
  </svg>
);
export default FacebookIcon;