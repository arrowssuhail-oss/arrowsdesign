
export interface ProjectPageData {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    gallery: (string | { type: 'video'; url: string; thumbnail: string } | { type: 'image'; url: string; overlay?: string; href?: string })[];
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
        heroImage: "",
        gallery: ["/Project-add-image/Id Card Mockup.jpg", "/Project-add-image/Id Card Mockup 2.jpg", "/Project-add-image/nw yr 1.jpg", "/Project-add-image/nw yr 2.jpg", "/Project-add-image/nw yr 3.jpg", "/Project-add-image/nw yr 4.jpg"],
        challenge: "The main challenge was to create a unique identity that stands out in a crowded market while maintaining a professional and trustworthy appeal. The client, a local tech startup, struggled with an outdated logo that looked like a construction firm. They needed a modern, tech-focused look to attract younger investors.",
        solution: "We developed a dynamic visual system based on circuit-board inspired geometric shapes and a neon-digital color palette to signal innovation. This approach allows for flexibility across various media while maintaining strong brand recognition.",
        role: "Graphic Designer",
        timeline: "1-2 Days",
        tools: "Adobe Creative Suite",
        year: "2025",
        features: ["Brand Identity System", "Typography System", "Color System", "Social Media Assets", "Visual Language"]
    },
    2: {
        heroTitle: "Web Development",
        heroDescription: "A game-changing web experience that challenges the norms of digital interaction. Created for Google to demonstrate advanced web capabilities.",
        heroImage: "",
        gallery: [
            { type: 'image', url: "/Project-add-image/Web-1.png", href: "https://arrowsdesign.me" },
            { type: 'image', url: "/Project-add-image/Web-2.png", overlay: "UNDER DEVELOPMENT" }
        ],
        challenge: "To create an immersive, high-performance web experience that pushes the boundaries of current browser capabilities while maintaining accessibility and responsiveness.",
        solution: "Utilized cutting-edge web technologies including WebGL and advanced CSS animations to create a fluid, physics-defying user interface.",
        role: "Web Designer & Developer",
        timeline: "8 Weeks",
        tools: "React, Three.js, GSAP",
        year: "2025",
        features: ["3D Interactive Elements", "Physics Simulation", "Custom WebGL Renderer", "Responsive Layout", "Performance Optimization", "Mobile Responsiveness"]
    },
    3: {
        heroTitle: "Product Digital Design",
        heroDescription: "A user-first approach to digital product design, focusing on solving real user problems through empathy and iterative testing.",
        heroImage: "/projects/ux-design.png",
        gallery: [],
        challenge: "To redesign a complex legacy system into an intuitive, user-friendly interface without losing critical functionality for power users.",
        solution: "Conducted extensive user research to inform a modular design system that simplifies workflows while providing depth for advanced operations.",
        role: "Lead Product Designer",
        timeline: "1-2 Months",
        tools: "Figma, UserTesting, Maze",
        year: "2025",
        features: ["User Research", "Prototyping", "Interactive UI Elements", "Design System", "Performance Optimization", "Mobile Responsiveness"]
    },
    4: {
        heroTitle: "Video Graphic Editing",
        heroDescription: "Crafting compelling visual stories through rhythm, pacing, and seamless transitions to engage audiences and convey messages effectively.",
        heroImage: "",
        gallery: [
            {
                type: 'video',
                url: "https://drive.google.com/file/d/1Uhy6YbbkhffVOlPIuujQ5ayknzlGlfcP/view?usp=sharing",
                thumbnail: "/projects/video%20edit/Video%201.png"
            },
            {
                type: 'video',
                url: "https://drive.google.com/file/d/1vyMA3Dp7G37DJ8gADUNrg-SM4Kgh-uPF/view?usp=sharing",
                thumbnail: "/projects/video%20edit/Video%202.png"
            },
            {
                type: 'video',
                url: "https://drive.google.com/file/d/17fZqjTjne_1g9w31ovjWExI89xtjZx0f/view?usp=sharing",
                thumbnail: "/projects/video%20edit/Video%203.png"
            }
        ],
        challenge: "To distill hours of raw footage into a concise, high-impact narrative that retains user attention across social media platforms.",
        solution: "Implemented fast-paced editing techniques with dynamic text overlays and sound design to create high-energy content optimized for engagement.",
        role: "Video Editor",
        timeline: "2 Days",
        tools: "Premiere Pro, After Effects",
        year: "2025",
        features: ["Motion Graphics", "Sound FX", "Color Grading", "Multi-track timeline editing", "Visual Effects"]
    }
};
