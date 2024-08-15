import React from 'react';

interface ArrowLeftProps {
  className: string;
}
const ArrowLeft: React.FC<ArrowLeftProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="32"
      viewBox="0 0 24 32"
      fill="currentColor"
      className={className}
    >
      <path
        d="M12.2305 24.5117L13.0039 23.7383C13.1869 23.5552 13.1869 23.2584 13.0039 23.0753L6.94408 17.0156H20.2812C20.5401 17.0156 20.75 16.8057 20.75 16.5469V15.4531C20.75 15.1942 20.5401 14.9844 20.2812 14.9844H6.94408L13.0039 8.92459C13.1869 8.74154 13.1869 8.44474 13.0039 8.26166L12.2305 7.4883C12.0474 7.30525 11.7506 7.30525 11.5675 7.4883L3.38729 15.6685C3.20424 15.8516 3.20424 16.1484 3.38729 16.3315L11.5675 24.5117C11.7506 24.6947 12.0474 24.6947 12.2305 24.5117Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowLeft;
