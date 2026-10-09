import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EDF4D6] border border-[#E5E7E8] text-[#18212B] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Dumbbell className="w-6 h-6 text-[#18212B] mb-1.5 opacity-80" />
        <span className="text-xs font-semibold tracking-tight text-[#18212B] line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
