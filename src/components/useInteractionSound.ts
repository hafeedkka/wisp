'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Very quiet procedural blips for hover/click feedback — no audio files
 * needed. Sound only starts after the user's first interaction (satisfies
 * autoplay policies) and can be muted via the returned `muted`/`toggleMute`.
 *
 * Swap the oscillator settings below (frequency, wave type, duration) to
 * change the sound's character, or replace `playTone` entirely with
 * `new Audio('/sounds/hover.mp3').play()` if you'd rather use real audio
 * files.
 */
export function useInteractionSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      ctxRef.current = new AudioCtx();
      unlockedRef.current = true;
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const playTone = (freq: number, duration: number, gain: number) => {
    if (mutedRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  return {
    muted,
    toggleMute: () => setMuted((m) => !m),
    playHover: () => playTone(720, 0.09, 0.03),
    playClick: () => playTone(480, 0.12, 0.045),
  };
}