import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  SxProps,
  Theme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt';
  entranceAnimation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'bounce';
  delay?: number;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  interactive?: boolean;
}

const hoverVariants = {
  lift: {
    y: -8,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  glow: {
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  scale: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tilt: {
    rotateY: 5,
    rotateX: 2,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const entranceVariants = {
  fadeIn: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideUp: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
  slideLeft: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  bounce: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    transition: { 
      duration: 0.8, 
      ease: [0.68, -0.55, 0.265, 1.55] 
    }
  }
};

const entranceAnimate = {
  fadeIn: { opacity: 1, y: 0 },
  slideUp: { opacity: 1, y: 0 },
  slideLeft: { opacity: 1, x: 0 },
  bounce: { opacity: 1, y: 0, scale: 1 }
};

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  title,
  subtitle,
  hoverEffect = 'lift',
  entranceAnimation = 'fadeIn',
  delay = 0,
  sx,
  onClick,
  interactive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      initial={entranceVariants[entranceAnimation]}
      animate={entranceAnimate[entranceAnimation]}
      transition={{ delay }}
      whileHover={hoverVariants[hoverEffect]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Card
        sx={{
          position: 'relative',
          overflow: 'visible',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          },
          '&:hover::before': {
            opacity: isHovered ? 1 : 0
          },
          ...sx
        }}
        component={motion.div}
        whileTap={{ scale: interactive ? 0.98 : 1 }}
      >
        <CardContent>
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.1, duration: 0.5 }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                {title}
              </Typography>
            </motion.div>
          )}
          
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.2, duration: 0.5 }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {subtitle}
              </Typography>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
