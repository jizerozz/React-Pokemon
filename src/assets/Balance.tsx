import React from 'react';

interface BalanceProps {
  className: string;
}
const Balance: React.FC<BalanceProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_346_14324)" filter="url(#filter0_d_346_14324)">
        <path
          d="M14 1.99997H11.9747C11.0609 0.793094 9.62719 -3.05176e-05 8 -3.05176e-05C6.37281 -3.05176e-05 4.93906 0.793094 4.02531 1.99997L2 1.99997C0.897187 1.99997 0 2.89716 0 3.99997L0 14C0 15.1028 0.897187 16 2 16H14C15.1028 16 16 15.1028 16 14V3.99997C16 2.89716 15.1028 1.99997 14 1.99997ZM8 0.999969C10.2091 0.999969 12 2.79091 12 4.99997C12 7.20903 10.2091 8.99997 8 8.99997C5.79094 8.99997 4 7.20903 4 4.99997C4 2.79091 5.79094 0.999969 8 0.999969ZM15 14C15 14.5522 14.5522 15 14 15H2C1.44781 15 1 14.5522 1 14L1 3.99997C1 3.44778 1.44781 2.99997 2 2.99997H3.42375C3.15437 3.61341 3 4.28809 3 4.99997C3 7.75684 5.24312 9.99997 8 9.99997C10.7569 9.99997 13 7.75684 13 4.99997C13 4.28809 12.8456 3.61341 12.5762 2.99997H14C14.5522 2.99997 15 3.44778 15 3.99997V14ZM8 7.99997C8.82719 7.99997 9.5 7.32716 9.5 6.49997C9.5 6.06497 9.31094 5.67622 9.01437 5.40216L9.95937 3.19684C10.0681 2.94341 9.95062 2.64934 9.69656 2.54059C9.44406 2.43184 9.14906 2.54903 9.04031 2.80341L8.09469 5.00966C6.98656 4.93747 6.5 5.89528 6.5 6.49997C6.5 7.32716 7.17281 7.99997 8 7.99997ZM8 5.99997C8.27625 5.99997 8.5 6.22372 8.5 6.49997C8.5 6.77622 8.27625 6.99997 8 6.99997C7.72375 6.99997 7.5 6.77622 7.5 6.49997C7.5 6.22372 7.72375 5.99997 8 5.99997Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_346_14324"
          x="-4"
          y="-3.05176e-05"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />

          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_346_14324"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_346_14324"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_346_14324">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Balance;
