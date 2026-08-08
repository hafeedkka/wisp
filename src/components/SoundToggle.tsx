'use client';

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SoundToggle({ muted, onToggle, className }: SoundToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? 'Unmute interaction sounds' : 'Mute interaction sounds'}
      className={
        'pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-sm transition-colors hover:text-white/90 hover:border-white/40 ' +
        (className ?? '')
      }
    >
      {muted ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="m22 9-6 6M16 9l6 6" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" />
        </svg>
      )}
    </button>
  );
}