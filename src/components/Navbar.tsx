import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#price' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 lg:px-12 py-4 sm:py-8">
      <nav className="flex items-center justify-between gap-3">
        <div className="flex items-center bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-2.5 sm:px-6 sm:py-4">
          <Logo className="h-5 sm:h-7 w-auto" />
          <span className="font-askan text-white text-base sm:text-xl tracking-wide ml-2">
            Wisp
          </span>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-4 sm:hidden text-white"
          >
            {menuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 px-2 py-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white text-sm px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden sm:block bg-white text-gray-900 font-medium text-sm px-6 py-3 rounded-full transition-transform duration-200 hover:scale-[1.03]"
        >
          Get a Quote
        </a>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-[4.5rem] left-4 right-4 bg-black/30 backdrop-blur-xl rounded-2xl p-5 border border-white/10 z-20">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="w-full text-center bg-white text-gray-900 font-medium text-sm px-6 py-3 rounded-full mt-1"
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
