import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
// import StatusCheck from "@/components/StatusCheck";

export default function Home() {
    return (
        <main>
            <Hero />
            <Work />
            <Skills />
            <Resume />
            <Contact />
            {/* <StatusCheck /> */}
        </main>
    );
}
