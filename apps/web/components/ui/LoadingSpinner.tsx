import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'dots' | 'pulse' | 'ripple' | 'wave' | 'orbit';
  text?: string;
  color?: string;
  sx?: SxProps<Theme>;
}

const sizeMap = {
  small: 24,
  medium: 48,
  large: 64
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  variant = 'dots',
  text,
  color = 'primary.main',
  sx
}) => {
  const spinnerSize = sizeMap[size];

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: spinnerSize / 4,
                  height: spinnerSize / 4,
                  borderRadius: '50%',
                  backgroundColor: color
                }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </Box>
        );

      case 'pulse':
        return (
          <motion.div
            style={{
              width: spinnerSize,
              height: spinnerSize,
              borderRadius: '50%',
              backgroundColor: color
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );

      case 'ripple':
        return (
          <Box sx={{ position: 'relative', width: spinnerSize, height: spinnerSize }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: spinnerSize,
                  height: spinnerSize,
                  borderRadius: '50%',
                  border: `2px solid ${color}`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: [0, 1],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut'
                }}
              />
            ))}
          </Box>
        );

      case 'wave':
        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: spinnerSize / 8,
                  backgroundColor: color,
                  borderRadius: '2px'
                }}
                animate={{
                  height: [spinnerSize / 4, spinnerSize, spinnerSize / 4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </Box>
        );

      case 'orbit':
        return (
          <Box sx={{ position: 'relative', width: spinnerSize, height: spinnerSize }}>
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: spinnerSize / 4,
                height: spinnerSize / 4,
                borderRadius: '50%',
                backgroundColor: color,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                x: [0, spinnerSize / 3, 0, -spinnerSize / 3, 0],
                y: [-spinnerSize / 3, 0, spinnerSize / 3, 0, -spinnerSize / 3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: spinnerSize / 6,
                height: spinnerSize / 6,
                borderRadius: '50%',
                backgroundColor: color,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                x: [0, -spinnerSize / 4, 0, spinnerSize / 4, 0],
                y: [spinnerSize / 4, 0, -spinnerSize / 4, 0, spinnerSize / 4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...sx
      }}
    >
      {renderSpinner()}
      
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            {text}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default LoadingSpinner;
