import React from 'react';

interface VacancyIconProps {
  className?: string;
}

export const VacancyIcon: React.FC<VacancyIconProps> = ({ className = '' }) => {
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
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
};
