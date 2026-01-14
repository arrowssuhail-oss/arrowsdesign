"use client";
import { ArrowUpRight, BarChart3, Palette, PanelsTopLeft, Smartphone, ChartNoAxesGantt, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { db } from "@/lib/storage";

// Icon Mapping for serialization
export const iconMap: Record<string, any> = {
    "Palette": Palette,
    "ChartNoAxesGantt": ChartNoAxesGantt,
    "PanelsTopLeft": PanelsTopLeft,
    "Smartphone": Smartphone,
    "MonitorSmartphone": MonitorSmartphone,
    "BarChart3": BarChart3,
    "ArrowUpRight": ArrowUpRight
};

export const defaultProjects = [
    {
        id: 1,
        title: "Custom & Unique Identity",
        category: "Graphic Design",
        color: "from-accent/40 to-accent/10",
        iconName: "ChartNoAxesGantt",
        shapes: ["rounded-lg", "rounded-full", "rounded-md"],
        link: "/project/graphic-design",
        image: "/projects/identity.png"
    },
    {
        id: 2,
        title: "Antigravity",
        category: "Web Design",
        color: "from-blue-500/30 to-blue-500/5",
        iconName: "PanelsTopLeft",
        shapes: ["rounded-md", "rounded-full", "rounded-lg"],
        link: "/project/web-design",
        image: "/projects/web-design.png"
    },
    {
        id: 3,
        title: "Human Centered Design",
        category: "UI/UX Design",
        color: "from-purple-500/30 to-purple-500/5",
        iconName: "PanelsTopLeft",
        shapes: ["rounded-md", "rounded-full", "rounded-lg"],
        link: "/project/ux-design",
        image: "/projects/ux-design.png"
    },
    {
        id: 4,
        title: "Video Editing",
        category: "Edited Videos",
        color: "from-violet-500/30 to-violet-500/5",
        iconName: "MonitorSmartphone",
        shapes: ["rounded-2xl", "rounded-lg", "rounded-full"],
        link: "/project/video-editing",
        image: "/projects/video-editing.png"
    },
];

const ProjectCard = ({ project }: { project: any }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-play slideshow if multiple images exist
    useEffect(() => {
        if (project.images && project.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
            }, 3000); // Change slide every 3 seconds
            return () => clearInterval(interval);
        }
    }, [project.images]);

    const Icon = iconMap[project.iconName] || Palette;

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left - width / 2;
        const y = e.clientY - rect.top - height / 2;

        // Calculate rotation values (scale down for subtle effect)
        // Rotate Y based on X position, Rotate X based on Y position (inverted)
        const rotateY = (x / width) * 10; // Reduced rotation for subtlety
        const rotateX = -(y / height) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovering(false);
    };

    // Determine if we have a slideshow or single image
    const hasSlideshow = project.images && project.images.length > 1;
    const displayImage = project.image; // Fallback for single image or initialization

    return (
        <Link
            ref={cardRef}
            href={project.link}
            className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer hover-lift block animate-flip-in-scroll"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1})`,
                transition: 'transform 0.3s ease-out'
            }}
        >
            {/* Background gradient or Image(s) */}
            {hasSlideshow ? (
                <>
                    <div
                        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {project.images.map((img: string, index: number) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${project.title} - Slide ${index + 1}`}
                                className="w-full h-full object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                    {/* Overlay to ensure text readability */}
                    <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300`} />
                </>
            ) : displayImage ? (
                <>
                    <img
                        src={displayImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay to ensure text readability */}
                    <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300`} />
                </>
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
            )}

            {/* Decorative shapes - Only show if no image */}
            {!displayImage && !hasSlideshow && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {project.shapes.map((shape: string, index: number) => (
                        <div
                            key={index}
                            className={`absolute bg-white/5 backdrop-blur-sm border border-white/10 ${shape} animate-float`}
                            style={{
                                width: index === 0 ? '120px' : index === 1 ? '80px' : '60px',
                                height: index === 0 ? '120px' : index === 1 ? '80px' : '60px',
                                top: index === 0 ? '-10%' : index === 1 ? '40%' : 'auto',
                                right: index === 0 ? '-5%' : 'auto',
                                left: index === 0 ? 'auto' : index === 1 ? '-5%' : '80%',
                                bottom: index === 2 ? '10%' : 'auto',
                                animationDelay: `${index * 1.5}s`,
                                animationDuration: `${6 + index * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Content overlay */}
            <div className={`absolute inset-0 p-8 flex flex-col justify-between z-20 ${displayImage || hasSlideshow ? 'text-white' : ''}`}>
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                        {project.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
                </div>

                <div style={{
                    transform: `translateZ(50px)`,
                    transformStyle: 'preserve-3d'
                }}>
                    <h3 className="text-2xl md:text-3xl font-bold">
                        {project.title}
                    </h3>
                </div>

                {/* Floating Icon */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon
                        className="w-24 h-24 text-white/10 rotate-12 transform group-hover:animate-[popIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        strokeWidth={1.5}
                    />
                </div>
            </div>

            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
    );
};

interface ProjectType {
    id: number | string;
    title: string;
    category: string;
    color: string;
    iconName: string;
    shapes: string[];
    link: string;
    images?: string[];
    image?: string | null;
}

const Projects = ({ projects = [] }: { projects?: ProjectType[] }) => {
    // Fallback to default if empty, or just use passed projects
    const displayProjects = projects.length > 0 ? projects : defaultProjects;

    return (
        <section id="works" className="py-20">
            <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="header-container mb-12" data-aos="fade-up">
                    <span className="text-accent text-sm font-medium uppercase tracking-widest block mb-4">Projects</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Selected <span className="text-accent">Works</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        A showcased selection of projects that demonstrate my passion for creating intuitive and impactful digital experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {displayProjects.map((project: any, index: number) => (
                        <ProjectCard key={project.id || project._id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
