import React from 'react';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  bsize: 'md' | 'lg';
  placeholder: string;
}

export function Input({ type, bsize, placeholder, ...props }: InputProps) {
  const inputSize = bsize == 'md' ? 'w-1/2' : 'w-full';
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`mb-3 p-2 border rounded ${inputSize}`}
      {...props}
    />
  );
}
