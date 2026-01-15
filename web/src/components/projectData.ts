
export interface ProjectPageData {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    gallery: string[];
    challenge: string;
    solution: string;
    role: string;
    timeline: string;
    tools: string;
    year: string;
    features: string[];
}

export const defaultPageContent: Record<number, ProjectPageData> = {
    1: {
        heroTitle: "Custom & Unique Identity",
        heroDescription: "A comprehensive brand identity project focusing on creating a distinct visual language that resonates with the target audience while maintaining professional versatility.",
        heroImage: "/projects/identity.png",
        gallery: [],
        challenge: "The main challenge was to create a unique identity that stands out in a crowded market while maintaining a professional and trustworthy appeal. We needed to ensure potential clients connect with the brand instantly.",
        solution: "We developed a dynamic visual system based on geometric shapes and a vibrant color palette. This approach allows for flexibility across various media while maintaining strong brand recognition.",
        role: "Graphic Designer",
        timeline: "1-2 Days",
        tools: "Adobe Creative Suite",
        year: "2025",
        features: ["Brand Identity System", "Typography System", "Color System", "Social Media Assets", "Visual Language"]
    },
    2: {
        heroTitle: "Antigravity",
        heroDescription: "A game-changing web experience that challenges the norms of digital interaction. Created for Google to demonstrate advanced web capabilities.",
        heroImage: "/projects/web-design.png",
        gallery: [],
        challenge: "To create an immersive, high-performance web experience that pushes the boundaries of current browser capabilities while maintaining accessibility and responsiveness.",
        solution: "Utilized cutting-edge web technologies including WebGL and advanced CSS animations to create a fluid, physics-defying user interface.",
        role: "Web Designer & Developer",
        timeline: "8 Weeks",
        tools: "React, Three.js, GSAP",
        year: "2025",
        features: ["3D Interactive Elements", "Physics Simulation", "Custom WebGL Renderer", "Responsive Layout", "Performance Optimization", "Mobile Responsiveness"]
    },
    3: {
        heroTitle: "Human Centered Design",
        heroDescription: "A user-first approach to digital product design, focusing on solving real user problems through empathy and iterative testing.",
        heroImage: "/projects/ux-design.png",
        gallery: [],
        challenge: "To redesign a complex legacy system into an intuitive, user-friendly interface without losing critical functionality for power users.",
        solution: "Conducted extensive user research to inform a modular design system that simplifies workflows while providing depth for advanced operations.",
        role: "Lead Product Designer",
        timeline: "3 Months",
        tools: "Figma, UserTesting, Maze",
        year: "2025",
        features: ["User Research", "Prototyping", "Interactive UI Elements", "Design System", "Performance Optimization", "Mobile Responsiveness"]
    },
    4: {
        heroTitle: "Video Editing",
        heroDescription: "Crafting compelling visual stories through rhythm, pacing, and seamless transitions to engage audiences and convey messages effectively.",
        heroImage: "/projects/video-editing.png",
        gallery: [],
        challenge: "To distill hours of raw footage into a concise, high-impact narrative that retains user attention across social media platforms.",
        solution: "Implemented fast-paced editing techniques with dynamic text overlays and sound design to create high-energy content optimized for engagement.",
        role: "Video Editor",
        timeline: "2 Days",
        tools: "Premiere Pro, After Effects",
        year: "2025",
        features: ["Motion Graphics", "Sound FX", "Color Grading", "Multi-track timeline editing", "Visual Effects"]
    }
};
