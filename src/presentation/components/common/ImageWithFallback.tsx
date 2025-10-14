'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
}

/**
 * Image component with fallback support
 * Shows fallback element (custom component) or fallback image when main image fails to load
 * 
 * @param fallbackElement - Custom React element to show on error (e.g., avatar with initials)
 * @param fallbackSrc - Fallback image URL (default: '/file.svg')
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/file.svg',
  fallbackElement,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      // Only set fallback image source if no custom fallback element provided
      if (!fallbackElement) {
        setImgSrc(fallbackSrc);
      }
    }
  };

  // Show custom fallback element if error and fallbackElement is provided
  if (error && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
