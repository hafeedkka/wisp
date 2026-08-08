'use client';

import type { MotionValue } from 'framer-motion';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CursorGlowProps {
  localX: MotionValue<number>;
  localY: MotionValue<number>;
  active: boolean;
  enabled: boolean;
  /** Wisp brand blue. Change here (or pass a prop) to retheme the glow. */
  color?: string;
  size?: number;
}

export default function CursorGlow({
  localX,
  localY,
  active,
  enabled,
  color = '#2547B3',
  size = 520,
}: CursorGlowProps) {
  // A slightly slower/heavier spring than the parallax layers so the glow
  // feels like it's trailing light rather than snapping to the cursor.
  const springX = useSpring(localX, { stiffness: 70, damping: 22, mass: 0.7 });
  const springY = useSpring(localY, { stiffness: 70, damping: 22, mass: 0.7 });

  const left = useTransform(springX, (v) => v - size / 2);
  const top = useTransform(springY, (v) => v - size / 2);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 rounded-full mix-blend-screen"
      style={{
        left,
        top,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}59 0%, ${color}26 35%, transparent 70%)`,
        filter: 'blur(48px)',
        opacity: active ? 1 : 0,
        transition: 'opacity 400ms ease',
        willChange: 'transform, opacity',
      }}
    />
  );
}