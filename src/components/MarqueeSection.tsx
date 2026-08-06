// import { useEffect, useRef, useState } from 'react';
// import { row1Images, row2Images } from '../data/marqueeImages';

// function tripled(images: string[]) {
//   return [...images, ...images, ...images];
// }

// export default function MarqueeSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const el = sectionRef.current;
//       if (!el) return;
//       const sectionTop = el.getBoundingClientRect().top + window.scrollY;
//       const value = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
//       setOffset(value);
//     };

//     handleScroll();
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const row1 = tripled(row1Images);
//   const row2 = tripled(row2Images);

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
//       style={{ overflowX: 'clip' }}
//     >
//       <div className="flex flex-col gap-3">
//         <div
//           className="flex gap-3"
//           style={{
//             transform: `translateX(${offset - 200}px)`,
//             willChange: 'transform',
//           }}
//         >
//           {row1.map((src, i) => (
//             <img
//               key={`row1-${i}`}
//               src={src}
//               alt=""
//               loading="lazy"
//               className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
//             />
//           ))}
//         </div>
//         <div
//           className="flex gap-3"
//           style={{
//             transform: `translateX(${-(offset - 200)}px)`,
//             willChange: 'transform',
//           }}
//         >
//           {row2.map((src, i) => (
//             <img
//               key={`row2-${i}`}
//               src={src}
//               alt=""
//               loading="lazy"
//               className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
