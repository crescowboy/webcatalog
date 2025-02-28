import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zooming, setZooming] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgContainerRef.current) return;

    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setZooming(true);
  };

  const handleMouseLeave = () => {
    setZooming(false);
  };

  return (
    <div
      ref={imgContainerRef}
      className="w-full h-96 flex justify-center items-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`w-full h-full relative transition-transform duration-300 ${zooming ? 'scale-150' : 'scale-100'}`}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          style={{ objectFit: 'contain' }} 
          quality={100} 
          priority 
        />
      </div>
    </div>
  );
};

export default ZoomableImage;
