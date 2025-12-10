import React from 'react';

export const CompanyIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-3" />
    <circle cx="9" cy="9" r="2" />
  </svg>
);
