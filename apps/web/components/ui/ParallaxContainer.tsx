import React, { useRef, useEffect, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  opacity?: boolean;
  scale?: boolean;
  blur?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  threshold?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
  };
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  opacity = true,
  scale = false,
  blur = false,
  sx,
  className,
  threshold = 0.1,
  springConfig = { stiffness: 100, damping: 30 }
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Create smooth spring animations
  const springScrollY = useSpring(scrollYProgress, springConfig);

  // Transform values based on direction
  const getTransformValue = (progress: number) => {
    const baseValue = progress * speed * 100;
    
    switch (direction) {
      case 'up':
        return { y: baseValue };
      case 'down':
        return { y: -baseValue };
      case 'left':
        return { x: baseValue };
      case 'right':
        return { x: -baseValue };
      default:
        return { y: baseValue };
    }
  };

  // Transform values
  const transform = useTransform(springScrollY, (progress) => 
    getTransformValue(progress)
  );
  
  const opacityTransform = useTransform(
    springScrollY,
    [0, threshold, 1 - threshold, 1],
    [0, 1, 1, 0]
  );
  
  const scaleTransform = useTransform(
    springScrollY,
    [0, 0.5, 1],
    [0.8, 1, 1.1]
  );
  
  const blurTransform = useTransform(
    springScrollY,
    [0, 0.5, 1],
    [10, 0, 5]
  );

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
    >
      <motion.div
        style={{
          transform,
          opacity: opacity ? opacityTransform : 1,
          scale: scale ? scaleTransform : 1,
          filter: blur ? `blur(${blurTransform}px)` : 'none',
          willChange: 'transform, opacity, scale, filter'
        }}
        initial={false}
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          },
          hidden: {
            opacity: 0,
            scale: 0.95,
            filter: 'blur(5px)'
          }
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

// Specialized parallax components for common use cases
export const ParallaxHero: React.FC<{
  children: React.ReactNode;
  height?: string | number;
  sx?: SxProps<Theme>;
}> = ({ children, height = '100vh', sx }) => (
  <ParallaxContainer
    speed={0.3}
    direction="up"
    opacity={true}
    scale={true}
    sx={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx
    }}
  >
    {children}
  </ParallaxContainer>
);

export const ParallaxCard: React.FC<{
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}> = ({ children, sx }) => (
  <ParallaxContainer
    speed={0.2}
    direction="up"
    opacity={true}
    scale={true}
    sx={{
      perspective: '1000px',
      ...sx
    }}
  >
    {children}
  </ParallaxContainer>
);
