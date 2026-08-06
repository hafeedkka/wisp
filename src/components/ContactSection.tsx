import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import Logo from './Logo';
import emailjs from "@emailjs/browser";


const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thewisp.in?igsh=ZnBrem5neG5rcWls',
  },
];



export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setSending(true);

  try {
    await emailjs.send(
      "service_1jzsoko",
      "template_duo1r8d",
      {
        user_name: form.name,
        user_email: form.email,
        message: form.message,
      },
      "rYR84KTwbBDpWjrU7"
    );

    setSent(true);
    setForm({
      name: "",
      email: "",
      message: "",
    });
  } catch (err) {
    console.error(err);
    setError("Couldn't send your message. Please try again.");
  } finally {
    setSending(false);
  }
};
  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left column - info */}
        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-col gap-8 sm:gap-10 h-full">
            <div className="flex items-center gap-2">
              <Logo className="h-6 sm:h-7 w-auto" />
              <span className="font-askan text-white text-lg sm:text-xl tracking-wide">
                Wisp
              </span>
            </div>

            <p className="text-white/60 font-light leading-relaxed max-w-sm text-sm sm:text-base md:text-lg">
              Have a project in mind or just want to say hello? Fill out the
              form and we'll get back to you within a couple of days.
            </p>

            <div className="flex flex-col gap-1.5">
              <span className="text-white/40 uppercase tracking-widest text-xs sm:text-sm">
                Email
              </span>
              <a
                href="mailto:thewisp04@gmail.com"
                className="text-white font-medium text-lg sm:text-xl md:text-2xl hover:opacity-70 transition-opacity"
              >
                thewisp04@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <span className="text-white/40 uppercase tracking-widest text-xs sm:text-sm">
                Follow
              </span>
              <div className="flex flex-col gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm sm:text-base w-fit"
                  >
                    {s.label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right column - form */}
        
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full gap-3 border border-white/10 rounded-[24px] p-8 sm:p-10">
              <span className="text-white font-medium text-xl sm:text-2xl">
                Thanks for reaching out.
              </span>
              <p className="text-white/60 text-sm sm:text-base">
                We've received your message and will be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-white/40 uppercase tracking-widest text-xs sm:text-sm"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-transparent border-b border-white/20 focus:border-white/60 text-white placeholder-white/30 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-white/40 uppercase tracking-widest text-xs sm:text-sm"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-transparent border-b border-white/20 focus:border-white/60 text-white placeholder-white/30 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-white/40 uppercase tracking-widest text-xs sm:text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="bg-transparent border-b border-white/20 focus:border-white/60 text-white placeholder-white/30 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm -mt-2">{error}</p>
              )}

                <button
                type="submit"
                disabled={sending}
                className="mt-4 self-start rounded-full text-[#0D2B3E] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed bg-white shadow-[0_4px_14px_rgba(13,43,62,0.15)]"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
       
      </div>
    </section>
  );
}
