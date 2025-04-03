import React, { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

interface HeroProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt?: string;
  children: ReactNode;
  height?: string;
  overlayOpacity?: number;
  className?: string;
  imagePosition?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

const Hero = ({
  backgroundImage,
  backgroundAlt = "Background image",
  children,
  height = "500px",
  overlayOpacity = 0.6,
  className = "",
  imagePosition = "center",
  objectFit = "cover"
}: HeroProps) => {
  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          quality={90}
          style={{ 
            objectFit, 
            objectPosition: imagePosition 
          }}
          className='rounded-2xl'
        />
      </div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-r from-content-secondary to-transparent"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-start justify-start px-8 pt-19 text-white p-4">
        {children}
      </div>
    </div>
  );
};

export default Hero;