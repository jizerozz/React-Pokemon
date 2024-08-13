import { useState, useEffect } from 'react';

export interface debounceProps {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: debounceProps) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};
