import logoImg from '../assets/wisp-logo.png';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Wisp logo"
      className={`object-contain ${className}`}
    />
  );
}