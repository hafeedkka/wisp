'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Tracks the pointer position *relative to a given section*, not the whole
 * viewport — so the effect stays confined to the hero and doesn't leak once
 * the user scrolls past it.
 *
 * All position updates happen through Framer Motion `MotionValue`s, which
 * update outside React's render cycle. Nothing here causes the hero (or its
 * children) to re-render on every mouse move — only `active` (a plain
 * boolean, toggled rarely on enter/leave) is regular React state.
 */
export function useHeroPointer(ref: RefObject<HTMLElement>) {
  // Normalized position within the section, -0.5 (left/top) to 0.5 (right/bottom)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pixel position within the section, for elements like the cursor glow
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const [active, setActive] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPointerFine(fineQuery.matches);
    setReducedMotion(motionQuery.matches);

    const onFineChange = (e: MediaQueryListEvent) => setPointerFine(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    fineQuery.addEventListener('change', onFineChange);
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      fineQuery.removeEventListener('change', onFineChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pointerFine || reducedMotion) return;

    let raf = 0;
    let pendingClientX = 0;
    let pendingClientY = 0;

    const flush = () => {
      const rect = el.getBoundingClientRect();
      const px = pendingClientX - rect.left;
      const py = pendingClientY - rect.top;
      localX.set(px);
      localY.set(py);
      x.set(px / rect.width - 0.5);
      y.set(py / rect.height - 0.5);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      pendingClientX = e.clientX;
      pendingClientY = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, pointerFine, reducedMotion, x, y, localX, localY]);

  return { x, y, localX, localY, active, pointerFine, reducedMotion };
}