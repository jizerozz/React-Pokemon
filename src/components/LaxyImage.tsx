import React, { useEffect, useState } from 'react';
import { pokeCardProps } from './PokeCard';

const LaxyImage = ({ url, name }: pokeCardProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<string>('opacity-0');

  useEffect(() => {
    if (!isLoading) {
      setOpacity('opacity-100');
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading && (
        <div className="absolute h-full z-10 w-full flex items-center justify-center">
          ...loading
        </div>
      )}
      <img
        src={url}
        alt={name}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={() => setLoading(false)}
        className={`object-contain h-full ${opacity}`}
      />
    </div>
  );
};

export default LaxyImage;
