import { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import projectList from './ProjectsList';

function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-theme-primary">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-purple/10 dark:bg-accent-purple/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light text-primary-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        Featured Projects
                    </span>
                    <h2 className="section-title">
                        <span className="text-theme-primary">Selected </span>
                        <span className="gradient-text">Work</span>
                    </h2>
                    <p className="section-subtitle px-2 sm:px-0">
                        Open-source projects and tools I've built and shared on GitHub
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {projectList.map((project, index) => (
                        <div
                            key={project.title}
                            className={`glass rounded-xl sm:rounded-2xl p-5 sm:p-7 card-hover group transition-all duration-700 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 100 + 200}ms` }}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-theme-primary group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h3>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass flex items-center justify-center text-theme-secondary hover:text-theme-primary hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                                    aria-label={`${project.title} on GitHub`}
                                >
                                    <FaGithub className="text-lg sm:text-xl" />
                                </a>
                            </div>

                            <p className="text-theme-secondary text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 text-theme-secondary border border-black/10 dark:border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors group/link"
                            >
                                <span>View on GitHub</span>
                                <HiExternalLink className="transition-transform group-hover/link:translate-x-1" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
