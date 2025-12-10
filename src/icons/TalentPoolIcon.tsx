import React from 'react';

interface TalentPoolIconProps {
  className?: string;
}

export const TalentPoolIcon: React.FC<TalentPoolIconProps> = ({ className = '' }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <circle cx="12" cy="16" r="3" />
      <path d="M8 11c-2.8 0-5 2.2-5 5v2h10v-2c0-2.8-2.2-5-5-5z" />
      <path d="M16 11c-2.8 0-5 2.2-5 5v2h10v-2c0-2.8-2.2-5-5-5z" />
    </svg>
  );
};
