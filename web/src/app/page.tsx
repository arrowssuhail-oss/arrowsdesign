
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects } from "@/actions/projects";

// Force dynamic since we fetch data
export const dynamic = 'force-dynamic';

export default async function Home() {
    const projectsData = await getProjects();

    // Map DB projects to UI format
    const mappedProjects = projectsData.map((p: any) => ({
        id: p._id,
        title: p.title,
        category: p.tags[0] || "Project",
        link: p.link || "#",
        // Default styling since DB doesn't have these yet
        color: "from-blue-500/30 to-blue-500/5",
        iconName: "MonitorSmartphone",
        shapes: ["rounded-md", "rounded-full", "rounded-lg"],
        images: p.images || [],
        image: p.images?.[0] || null
    }));

    return (
        <main>
            <Hero />
            <About />
            <Projects projects={mappedProjects} />
            <Skills />
            <Resume />
            <Contact />
            <Footer />
        </main>
    );
}
