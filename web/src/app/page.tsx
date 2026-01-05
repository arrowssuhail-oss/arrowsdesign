import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import StatusCheck from "@/components/StatusCheck";

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Resume />
            <Contact />
            {/* <StatusCheck /> */}
            <Footer />
        </main>
    );
}
