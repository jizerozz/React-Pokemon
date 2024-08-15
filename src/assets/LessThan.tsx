import React from 'react';

interface LessThanProps {
  className: string;
}
const LessThan: React.FC<LessThanProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 8 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_346_14990)">
        <path
          d="M7.228 14.8093L7.84671 14.1906C7.99315 14.0442 7.99315 13.8067 7.84671 13.6603L2.19987 7.99996L7.84671 2.33965C7.99315 2.19321 7.99315 1.95578 7.84671 1.80931L7.228 1.19059C7.08156 1.04415 6.84412 1.04415 6.69765 1.19059L0.153466 7.73478C0.0070281 7.88121 0.0070281 8.11865 0.153466 8.26512L6.69765 14.8093C6.84412 14.9558 7.08156 14.9558 7.228 14.8093Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_346_14990">
          <rect
            width="8"
            height="16"
            fill="white"
            transform="translate(8 16) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LessThan;
