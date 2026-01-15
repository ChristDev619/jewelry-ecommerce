import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * OptimizedImage Component
 * Provides lazy loading, WebP/AVIF support, and responsive images
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  style,
  objectFit = 'cover',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate srcSet for responsive images if Strapi URL
  const generateSrcSet = (url) => {
    if (!url || !url.includes('localhost:1337')) return null;
    
    // Strapi image transformation
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=400&format=webp 400w, ${baseUrl}?w=800&format=webp 800w, ${baseUrl}?w=1200&format=webp 1200w`;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <Box
        sx={{
          width: width || '100%',
          height: height || 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#999',
        }}
      >
        Image unavailable
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: width || '100%', height: height || '100%' }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0,
            aspectRatio: '1/1'
          }}
        />
      )}
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        alt={alt || 'Product image'}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        style={{
          ...style,
          width: '100%',
          height: '100%',
          objectFit,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        {...props}
      />
    </Box>
  );
};

export default OptimizedImage;

