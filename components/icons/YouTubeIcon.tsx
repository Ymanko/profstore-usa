import React from "react";

const YouTubeIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Червоний градієнт */}
      <linearGradient id="ytGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF3D00" />
        <stop offset="100%" stopColor="#C80000" />
      </linearGradient>

      {/* Маска: залишає прямокутник, вирізає трикутник */}
      <mask id="ytMask">
        {/* Прямокутник */}
        <rect
          x="127"
          y="237"
          width="770"
          height="520"
          rx="80"
          ry="80"
          fill="white"
        />
        {/* Вирізаний великий трикутник (Play) — центровано */}
        <polygon
          points="430,384 430,640 650,512"
          fill="black"
        />
      </mask>
    </defs>

    {/* Обвідне коло */}
    <circle
      cx="512"
      cy="512"
      r="480"
      stroke="url(#ytGradient)"
      strokeWidth="60"
      fill="none"
    />

    {/* Прямокутник з вирізом у вигляді трикутника */}
    <g mask="url(#ytMask)">
      <rect
        x="127"
        y="237"
        width="770"
        height="520"
        rx="80"
        ry="80"
        fill="url(#ytGradient)"
      />
    </g>
  </svg>
);

export default YouTubeIcon;