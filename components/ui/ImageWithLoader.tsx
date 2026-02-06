import React, { useState } from 'react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  className = '', 
  containerClassName = '', 
  alt, 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loader Minimaliste */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-0">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-400" />
        </div>
      )}

      {/* Image */}
      <img
        {...props}
        alt={alt}
        onLoad={(e) => {
          setIsLoaded(true);
          props.onLoad?.(e);
        }}
        className={`transition-opacity duration-700 ease-out ${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};