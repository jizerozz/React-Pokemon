import React from 'react';

interface InputProps {
  type: string;
  bsize: 'md' | 'lg';
  placeholder: string;
}

export default function Input({ type, bsize, placeholder }: InputProps) {
  const inputSize = bsize == 'md' ? 'w-1/2' : 'w-full';
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`mb-3 p-2 border rounded ${inputSize}`}
    />
  );
}
