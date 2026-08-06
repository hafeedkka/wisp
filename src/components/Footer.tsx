export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 border-t border-white/10 pt-6">
        <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
          &copy; {year} Wisp. All rights reserved.
        </p>
        <p className="text-white/30 text-xs sm:text-sm text-center sm:text-right">
          Website Design &amp; Development Studio
        </p>
      </div>
    </footer>
  );
}
