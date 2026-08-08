'use client';

import type { MotionValue } from 'framer-motion';
import { motion, useSpring } from 'framer-motion';

interface CustomCursorProps {
  localX: MotionValue<number>;
  localY: MotionValue<number>;
  active: boolean;
  enabled: boolean;
  hovering: boolean; // true when hovering an interactive element (button, pill)
  color?: string;
}

/**
 * Two-part cursor: a small solid dot that tracks tightly, and a ring that
 * trails behind with spring lag and scales up on hover. Real cursor stays
 * hidden via `cursor-none` on the hero wrapper (desktop-only, applied in
 * HeroSection).
 */
export default function CustomCursor({
  localX,
  localY,
  active,
  enabled,
  hovering,
  color = '#2547B3',
}: CustomCursorProps) {
  const dotX = useSpring(localX, { stiffness: 800, damping: 40, mass: 0.2 });
  const dotY = useSpring(localY, { stiffness: 800, damping: 40, mass: 0.2 });
  const ringX = useSpring(localX, { stiffness: 150, damping: 20, mass: 0.4 });
  const ringY = useSpring(localY, { stiffness: 150, damping: 20, mass: 0.4 });

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-30 rounded-full"
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: 6,
          height: 6,
          backgroundColor: color,
          opacity: active ? 1 : 0,
          transition: 'opacity 300ms ease',
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-30 rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: `${color}${hovering ? 'cc' : '80'}`,
          backgroundColor: hovering ? `${color}14` : 'transparent',
          opacity: active ? 1 : 0,
          transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), height 300ms cubic-bezier(0.16,1,0.3,1), background-color 300ms ease, border-color 300ms ease, opacity 300ms ease',
          willChange: 'transform, width, height',
        }}
      />
    </>
  );
}