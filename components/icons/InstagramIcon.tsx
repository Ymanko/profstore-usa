import React from 'react';

const InstagramIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="instaGradient" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#f58529" />
        <stop offset="30%" stopColor="#dd2a7b" />
        <stop offset="60%" stopColor="#8134af" />
        <stop offset="100%" stopColor="#515bd4" />
      </linearGradient>
    </defs>

    {/* Зовнішнє коло */}
    <circle cx="512" cy="512" r="480" stroke="url(#instaGradient)" strokeWidth="60" fill="none" />

    {/* Квадрат з округленням — основа логотипа */}
    <rect
      x="212"
      y="212"
      width="600"
      height="600"
      rx="100"
      ry="100"
      fill="none"
      stroke="url(#instaGradient)"
      strokeWidth="60"
    />

    {/* Велике коло камери (збільшене) */}
    <circle
      cx="512"
      cy="512"
      r="150"
      fill="none"
      stroke="url(#instaGradient)"
      strokeWidth="60"
    />

    {/* Маленьке коло вгорі — спалах */}
    <circle cx="690" cy="320" r="50" fill="url(#instaGradient)" />
  </svg>
);

export default InstagramIcon;