import React, { useState } from 'react';
import {
  Fab,
  Tooltip,
  Zoom,
  SxProps,
  Theme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { SvgIconComponent } from '@mui/icons-material';

interface FloatingActionButtonProps {
  icon: SvgIconComponent;
  onClick: () => void;
  tooltip?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'extended';
  sx?: SxProps<Theme>;
  disabled?: boolean;
  animation?: 'bounce' | 'pulse' | 'shake' | 'rotate';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const positionStyles = {
  'bottom-right': { bottom: 16, right: 16 },
  'bottom-left': { bottom: 16, left: 16 },
  'top-right': { top: 16, right: 16 },
  'top-left': { top: 16, left: 16 }
};

const animationVariants = {
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  shake: {
    animate: {
      x: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  rotate: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  tooltip,
  color = 'primary',
  size = 'large',
  variant = 'circular',
  sx,
  disabled = false,
  animation,
  position = 'bottom-right'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const button = (
    <motion.div
      style={{
        position: 'fixed',
        zIndex: 1000,
        ...positionStyles[position]
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.5
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      {...(animation && animationVariants[animation])}
    >
      <Fab
        color={color}
        size={size}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        sx={{
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%) scale(0)',
            transition: 'transform 0.3s ease',
            pointerEvents: 'none'
          },
          '&:hover::before': {
            transform: 'translate(-50%, -50%) scale(1.5)'
          },
          '&:active::before': {
            transform: 'translate(-50%, -50%) scale(2)',
            opacity: 0
          },
          ...sx
        }}
      >
        <motion.div
          animate={isPressed ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Icon />
        </motion.div>
      </Fab>
    </motion.div>
  );

  if (tooltip) {
    return (
      <Tooltip
        title={tooltip}
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        {button}
      </Tooltip>
    );
  }

  return button;
};
