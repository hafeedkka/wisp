import FadeIn from './FadeIn';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <section
    
      id="projects"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
      style={{
        background:
          'linear-gradient(135deg, #E8F0F5 0%, #DCE8F0 25%, #A8C8DC 55%, #6FA8C8 80%, #5B9BC4 100%)',
      }}
    >
       <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-[right_center] lg:object-center"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
      />
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} totalCards={projects.length} />
        ))}
      </div>
    </section>
  );
}