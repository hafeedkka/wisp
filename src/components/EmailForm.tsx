import { useState, type FormEvent } from 'react';

// Same Web3Forms access key used in ContactSection.tsx — keep both in sync.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function EmailForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New quote request from Wisp site',
          from_name: 'Wisp website',
          email,
          message: `${email} requested a quote via the homepage form.`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
      if (data.success) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div
        className={`relative bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4 sm:px-6 py-3 sm:py-4 ${className}`}
      >
        <span className="text-white text-sm">Thanks! We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative bg-black/30 backdrop-blur-md rounded-full border border-white/10 ${className}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={
          status === 'error'
            ? "Couldn't send — try again"
            : 'Your email address'
        }
        className="w-full bg-transparent text-white placeholder-white/50 px-4 sm:px-6 py-3 sm:py-4 pr-28 sm:pr-36 text-sm outline-none"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-gray-900 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Get a Quote'}
      </button>
    </form>
  );
}