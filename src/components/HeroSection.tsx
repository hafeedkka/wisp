'use client';

import { useRef, useState } from 'react';
import FeaturePill from './FeaturePill';
// import EmailForm from './EmailForm';

import { useHeroPointer } from './useHeroPointer';
import ParallaxLayer from './ParallaxLayer';
import CursorGlow from './CursorGlow';
import CustomCursor from './CustomCursor';
import Magnet from './Magnet';
import { useInteractionSound } from './useInteractionSound';
import SoundToggle from './SoundToggle';

const features = ['Custom Design', 'Fast Development', 'SEO Optimized'];

// Wisp brand blue — change this one value to retheme the glow + cursor.
const WISP_BLUE = '#2547B3';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y, localX, localY, active, pointerFine, reducedMotion } = useHeroPointer(sectionRef);
  const { muted, toggleMute, playHover, playClick } = useInteractionSound();
  const [pillHovered, setPillHovered] = useState(false);

  const interactionsEnabled = pointerFine && !reducedMotion;

  const handlePillHover = (hovering: boolean) => {
    setPillHovered(hovering);
    if (hovering) playHover();
  };

  return (
    <section
      ref={sectionRef}
      className={
        'relative h-screen w-full overflow-hidden' +
        (interactionsEnabled ? ' cursor-none' : '')
      }
    >
      {/* Video background — subtle parallax drift only, unchanged otherwise */}
      <ParallaxLayer
        x={x}
        y={y}
        enabled={interactionsEnabled}
        strength={6}
        spring={{ stiffness: 90, damping: 24, mass: 0.6 }}
        className="absolute inset-0 h-full w-full scale-110"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-[80%_center] md:object-[right_center] lg:object-center"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
        />
      </ParallaxLayer>

      {/* Cursor-following light + custom cursor, confined to the hero */}
      <CursorGlow localX={localX} localY={localY} active={active} enabled={interactionsEnabled} color={WISP_BLUE} />

      {/* Content layer — moves slightly more than the background */}
      <ParallaxLayer
        x={x}
        y={y}
        enabled={interactionsEnabled}
        strength={10}
        spring={{ stiffness: 110, damping: 20, mass: 0.5 }}
        className="absolute inset-0 z-10 flex flex-col px-4 sm:px-10 lg:px-12 py-4 sm:py-8"
      >
        {/* Spacer to sit below the fixed navbar */}
        <div className="h-[3.5rem] sm:h-[4.5rem]" />

        {/* Mobile spacer */}
        <div className="flex-1 sm:hidden" />

        {/* Main content */}
        <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-end pb-4 sm:pb-12 lg:pb-16 sm:mt-auto">
          {/* Left column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="font-askan text-white text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-[700px]">
              Websites built to grow your business.
            </h1>

            <p className="text-white/70 text-xs sm:text-base md:text-lg max-w-[520px] leading-relaxed">
              Wisp is a website design &amp; development studio. We design and
              build fast, beautiful, conversion-focused websites for brands
              that want to stand out online.
            </p>

            {/* <EmailForm className="max-w-[420px]" /> */}

            {/* Feature pills - mobile only (no magnetic/tilt: touch device) */}
            <div className="flex sm:hidden flex-wrap gap-2 mt-2">
              {features.map((f) => (
                <FeaturePill key={f} label={f} className="text-xs px-3 py-1.5" />
              ))}
            </div>
          </div>

          {/* Right column - feature pills, desktop only: floating layer, moves the most + tilts + magnetic */}
          <div className="hidden sm:flex flex-col items-end gap-2 self-end ml-auto">
            {features.map((f) => (
              <ParallaxLayer
                key={f}
                x={x}
                y={y}
                enabled={interactionsEnabled}
                strength={22}
                tilt={5}
                spring={{ stiffness: 140, damping: 16, mass: 0.4 }}
              >
                {interactionsEnabled ? (
  <Magnet padding={90} strength={6}>
    <div
      onMouseEnter={() => handlePillHover(true)}
      onMouseLeave={() => handlePillHover(false)}
      onClick={playClick}
      className="transition-transform duration-300 ease-out hover:scale-105"
    >
      <FeaturePill label={f} className="text-xs sm:text-sm px-4 py-2" />
    </div>
  </Magnet>
) : (
  <FeaturePill label={f} className="text-xs sm:text-sm px-4 py-2" />
)}
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </ParallaxLayer>

      <CustomCursor
        localX={localX}
        localY={localY}
        active={active}
        enabled={interactionsEnabled}
        hovering={pillHovered}
        color={WISP_BLUE}
      />

      {interactionsEnabled && (
        <div className="absolute bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
          <SoundToggle muted={muted} onToggle={toggleMute} />
        </div>
      )}
    </section>
  );
}