'use client';

import type { ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  x: MotionValue<number>; // normalized -0.5..0.5, from useHeroPointer
  y: MotionValue<number>;
  enabled: boolean; // pointerFine && !reducedMotion
  /** Max travel distance in px. Background ~4-8, content ~10-16, floating ~20-32 */
  strength?: number;
  /** Max tilt rotation in degrees. 0 disables tilt. */
  tilt?: number;
  spring?: { stiffness: number; damping: number; mass?: number };
  className?: string;
}

/**
 * Wraps any hero element and makes it drift + tilt with the cursor.
 * Give it a smaller `strength` for background elements and a larger one
 * for floating/foreground elements so the whole hero feels layered rather
 * than moving as one flat plane.
 */
export default function ParallaxLayer({
  children,
  x,
  y,
  enabled,
  strength = 12,
  tilt = 0,
  spring = { stiffness: 120, damping: 20, mass: 0.5 },
  className,
}: ParallaxLayerProps) {
  const translateX = useTransform(x, [-0.5, 0.5], [-strength, strength]);
  const translateY = useTransform(y, [-0.5, 0.5], [-strength, strength]);
  const springX = useSpring(translateX, spring);
  const springY = useSpring(translateY, spring);

  const rotateXRaw = useTransform(y, [-0.5, 0.5], [tilt, -tilt]);
  const rotateYRaw = useTransform(x, [-0.5, 0.5], [-tilt, tilt]);
  const rotateX = useSpring(rotateXRaw, spring);
  const rotateY = useSpring(rotateYRaw, spring);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        x: springX,
        y: springY,
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformPerspective: tilt ? 800 : undefined,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}