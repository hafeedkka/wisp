import FadeIn from './FadeIn';
import { services } from '../data/projects';

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 bg-[#0C0C0C] overflow-hidden"
    >
    <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-[right_center] lg:object-center"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
      />
      <FadeIn delay={0} y={40}>
        <h2
          className="relative text-white text-center mb-16 sm:mb-20 md:mb-24 tracking-tight"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(3rem, 12vw, 130px)',
          }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {services.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={20}
            className={i === services.length - 1 && services.length % 2 !== 0 ? 'sm:col-span-2' : ''}
          >
            <div className="liquid-glass rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-8 sm:py-10 h-full flex flex-col gap-4 sm:gap-6 transition-transform duration-300 hover:-translate-y-1">
              <span
                className="text-white/25 font-light leading-none"
                style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-white font-medium uppercase tracking-wide text-base sm:text-lg">
                  {service.name}
                </h3>
                <p className="text-white/50 font-light leading-relaxed text-sm sm:text-base max-w-md">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
