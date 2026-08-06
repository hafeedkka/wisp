import FeaturePill from './FeaturePill';
// import EmailForm from './EmailForm';

const features = ['Custom Design', 'Fast Development', 'SEO Optimized'];

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-[right_center] lg:object-center"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
      />

      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex flex-col px-4 sm:px-10 lg:px-12 py-4 sm:py-8">
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

            {/* Feature pills - mobile only */}
            <div className="flex sm:hidden flex-wrap gap-2 mt-2">
              {features.map((f) => (
                <FeaturePill key={f} label={f} className="text-xs px-3 py-1.5" />
              ))}
            </div>
          </div>

          {/* Right column - feature pills, desktop only */}
          <div className="hidden sm:flex flex-col items-end gap-2 self-end ml-auto">
            {features.map((f) => (
              <FeaturePill key={f} label={f} className="text-xs sm:text-sm px-4 py-2" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
