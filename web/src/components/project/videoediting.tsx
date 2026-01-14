"use client";

import { ArrowLeft, MonitorSmartphone, CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { defaultPageContent, ProjectPageData } from "@/components/projectData";
import { db } from "@/lib/storage";
import { ProjectCarousel } from "@/components/ProjectCarousel";

const VideoEditing = () => {
  const [content, setContent] = useState<ProjectPageData>(defaultPageContent[4]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const stored = await db.getItem<ProjectPageData>("arrows_page_content_4");
        if (stored) setContent(stored);
      } catch (e) {
        console.error("Failed to load content", e);
      }
    };
    loadContent();

    const handleUpdate = () => loadContent();
    window.addEventListener("page-content-update-4", handleUpdate);
    return () => window.removeEventListener("page-content-update-4", handleUpdate);
  }, []);

  const allImages = [content.heroImage, ...(content.gallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/#works" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center">
              <MonitorSmartphone className="w-8 h-8 text-violet-500" />
            </div>
            <div>
              <span className="text-violet-500 text-sm font-medium uppercase tracking-widest">Video Editing</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">{content.heroTitle}</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            {content.heroDescription}
          </p>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {allImages.length === 0 ? (
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-violet-500/30 to-violet-500/5 flex items-center justify-center overflow-hidden relative">
              <div className="absolute w-44 h-44 rounded-2xl bg-foreground/5 animate-float" style={{ top: '18%', left: '62%' }} />
              <div className="absolute w-36 h-36 rounded-lg bg-foreground/10 animate-float" style={{ top: '52%', left: '18%', animationDelay: '0.5s' }} />
              <div className="absolute w-24 h-24 rounded-full bg-foreground/5 animate-float" style={{ top: '32%', left: '38%', animationDelay: '1s' }} />
              <MonitorSmartphone className="w-32 h-32 text-foreground/40" />
            </div>
          ) : (
            <ProjectCarousel images={allImages} />
          )}

          <div className="flex justify-center mt-12">
            <Link href="/payments">
              {/* <Button variant="accent" size="lg" className="rounded-full px-8 group shadow-lg shadow-violet-500/20">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Download Video
              </Button> */}
            </Link>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Role</span>
            <p className="text-lg font-medium mt-2">{content.role}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">{content.timeline}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <div className="flex items-center gap-4 mt-2">
              {/* Premiere Pro */}
              <svg viewBox="0 0 83 80" fill="none" className="h-8 w-auto">
                <g clipPath="url(#premiere__clip0_906_1820)">
                  <path d="M14.5299 0H67.5214C75.5556 0 82.0513 6.49573 82.0513 14.5299V65.4701C82.0513 73.5043 75.5556 80 67.5214 80H14.5299C6.49573 80 0 73.5043 0 65.4701V14.5299C0 6.49573 6.49573 0 14.5299 0Z" fill="#00005B" />
                  <path d="M19.4872 56.1025V20.923C19.4872 20.6837 19.5897 20.5469 19.8291 20.5469C20.4103 20.5469 20.9573 20.5469 21.7436 20.5127C22.5641 20.4785 23.4188 20.4785 24.3419 20.4444C25.265 20.4102 26.2564 20.4102 27.3162 20.376C28.3761 20.3418 29.4017 20.3418 30.4274 20.3418C33.2308 20.3418 35.5556 20.6837 37.4701 21.4016C39.1795 21.9828 40.7521 22.9401 42.0513 24.205C43.1453 25.2991 44 26.6324 44.547 28.1025C45.0598 29.5384 45.3333 31.0085 45.3333 32.5469C45.3333 35.4871 44.6496 37.9144 43.2821 39.829C41.9145 41.7435 40 43.1794 37.7778 43.9999C35.453 44.8546 32.8889 45.1623 30.0855 45.1623C29.265 45.1623 28.718 45.1623 28.3761 45.1281C28.0342 45.0939 27.5556 45.0939 26.906 45.0939V56.0683C26.9402 56.3076 26.7692 56.5127 26.5299 56.5469C26.4957 56.5469 26.4615 56.5469 26.3932 56.5469H19.8974C19.6239 56.5469 19.4872 56.4102 19.4872 56.1025ZM26.9402 27.1452V38.6324C27.4188 38.6666 27.8633 38.7008 28.2735 38.7008H30.0855C31.4188 38.7008 32.7521 38.4956 34.0171 38.0854C35.1111 37.7777 36.0684 37.1281 36.8205 36.2734C37.5385 35.4187 37.8803 34.2563 37.8803 32.7521C37.9145 31.6922 37.641 30.6324 37.094 29.7093C36.5128 28.8204 35.6923 28.1367 34.7009 27.7606C33.4359 27.2478 32.0684 27.0427 30.6667 27.0768C29.7778 27.0768 28.9915 27.0768 28.3419 27.111C27.6581 27.0768 27.1795 27.111 26.9402 27.1452Z" fill="#9999FF" />
                  <path d="M50.1197 29.128H56.1026C56.4445 29.128 56.718 29.3674 56.8205 29.675C56.9231 29.9485 56.9915 30.2221 57.0257 30.5297C57.094 30.8716 57.1624 31.2477 57.1966 31.5896C57.2308 31.9656 57.265 32.3759 57.265 32.8203C58.2906 31.6238 59.5214 30.6323 60.9231 29.8802C62.4957 28.9913 64.3077 28.5468 66.1197 28.5468C66.359 28.5126 66.5641 28.6836 66.5983 28.9229C66.5983 28.9571 66.5983 28.9913 66.5983 29.0597V35.7263C66.5983 35.9998 66.4274 36.1024 66.0513 36.1024C64.8205 36.0682 63.5556 36.1708 62.359 36.4443C61.3675 36.6494 60.4103 36.9571 59.4872 37.3673C58.8376 37.675 58.2222 38.0853 57.7436 38.6323V56.0682C57.7436 56.4101 57.6069 56.5468 57.2992 56.5468H50.5641C50.2906 56.581 50.0513 56.4101 50.0171 56.1366C50.0171 56.1024 50.0171 56.034 50.0171 55.9998V37.0597C50.0171 36.2391 50.0171 35.3844 49.9829 34.4956C49.9487 33.6067 49.9487 32.7178 49.9145 31.8289C49.9145 31.0426 49.8462 30.2904 49.7778 29.5041C49.7436 29.3332 49.8462 29.1622 50.0171 29.128C50.0171 29.0938 50.0855 29.0938 50.1197 29.128Z" fill="#9999FF" />
                </g>
                <defs>
                  <clipPath id="premiere__clip0_906_1820">
                    <rect width="82.0513" height="80" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* After Effects */}
              <svg viewBox="0 0 83 80" fill="none" className="h-8 w-auto">
                <g clipPath="url(#after_effects__clip0_912_9)">
                  <path d="M67.5214 0H14.5299C6.50526 0 0 6.50526 0 14.5299V65.4701C0 73.4947 6.50526 80 14.5299 80H67.5214C75.546 80 82.0513 73.4947 82.0513 65.4701V14.5299C82.0513 6.50526 75.546 0 67.5214 0Z" fill="#00005B" />
                  <path d="M32.9624 47.8634H20.2474L17.6604 55.915C17.6252 56.0616 17.54 56.1913 17.4194 56.2817C17.2988 56.3721 17.1504 56.4177 16.9999 56.4104H10.5599C10.1927 56.4104 10.0642 56.2086 10.1746 55.805L21.1832 24.2314C21.2932 23.9012 21.4034 23.5783 21.5134 23.156C21.6576 22.4216 21.7313 21.6752 21.7336 20.9268C21.7261 20.8745 21.731 20.8212 21.7477 20.771C21.7644 20.7209 21.7926 20.6753 21.83 20.6379C21.8674 20.6005 21.9129 20.5723 21.9631 20.5556C22.0132 20.5389 22.0666 20.534 22.1189 20.5415H30.8708C31.127 20.5415 31.2738 20.6332 31.3111 20.8168L43.8058 55.86C43.9158 56.2272 43.8057 56.4107 43.4756 56.4104H36.32C36.1971 56.4241 36.0734 56.3925 35.9721 56.3216C35.8708 56.2507 35.7988 56.1453 35.7696 56.0251L32.9624 47.8634ZM22.2291 41.0745H30.9258C30.7056 40.3409 30.4487 39.5152 30.1551 38.5975C29.861 37.6807 29.5491 36.6991 29.2194 35.6527C28.8892 34.607 28.559 33.5611 28.2287 32.5153C27.8985 31.4695 27.5957 30.4604 27.3204 29.4879C27.0453 28.5161 26.7976 27.6263 26.5774 26.8184H26.5223C26.2126 28.305 25.8268 29.7747 25.3664 31.2218C24.8521 32.8731 24.3292 34.5611 23.7977 36.2857C23.2654 38.011 22.7425 39.6072 22.2291 41.0745Z" fill="#9999FF" />
                  <path d="M64.0619 44.7295H53.2185C53.3513 45.8024 53.7076 46.8355 54.2644 47.7622C54.8799 48.6798 55.7504 49.3973 56.7687 49.8263C58.1487 50.4234 59.6413 50.716 61.1447 50.684C62.3374 50.6611 63.5256 50.5306 64.6949 50.2942C65.7407 50.153 66.7656 49.8858 67.7473 49.4985C67.9304 49.3523 68.0226 49.4435 68.0226 49.7737V55.0028C68.0316 55.1452 68.0031 55.2876 67.9399 55.4156C67.8769 55.5157 67.7923 55.6003 67.6922 55.6632C66.6033 56.1456 65.4574 56.4869 64.2821 56.6791C62.6854 56.979 61.0627 57.1173 59.4383 57.092C56.8323 57.092 54.6489 56.6883 52.8882 55.881C51.2236 55.1477 49.7535 54.0357 48.5949 52.6335C47.5127 51.3123 46.7077 49.7866 46.228 48.1475C45.753 46.5297 45.512 44.8522 45.5125 43.1661C45.5074 41.3251 45.7954 39.4949 46.3657 37.7444C46.9149 36.0369 47.7834 34.4492 48.9252 33.0658C50.0513 31.6985 51.4595 30.5908 53.0534 29.8182C54.6677 29.0296 56.5761 28.7466 58.7778 28.7466C60.6037 28.7005 62.4173 29.0576 64.0894 29.7924C65.4955 30.3921 66.7333 31.3269 67.6947 32.5153C68.5965 33.679 69.2859 34.9927 69.7313 36.3959C70.165 37.7481 70.3878 39.1591 70.3918 40.5791C70.3918 41.3867 70.3643 42.1206 70.3092 42.7808C70.2543 43.4413 70.2084 43.9183 70.1716 44.2119C70.1574 44.3333 70.099 44.4452 70.0077 44.5263C69.9163 44.6075 69.7984 44.6523 69.6762 44.6523C69.456 44.6523 69.0799 44.6798 68.5479 44.7349C68.0155 44.7899 67.355 44.8266 66.5664 44.8449C65.7768 44.8638 64.9426 44.7295 64.0619 44.7295ZM53.2185 39.7153H60.4291C61.3098 39.7153 61.9611 39.7061 62.383 39.6878C62.6654 39.6595 62.938 39.5692 63.1813 39.4232V39.0929C63.1702 38.6624 63.096 38.2359 62.9611 37.827C62.6641 36.8879 62.0671 36.0723 61.2616 35.5055C60.4561 34.9387 59.4869 34.652 58.5027 34.6895C57.5764 34.6335 56.6538 34.8483 55.8474 35.3077C55.0411 35.7671 54.3858 36.4511 53.9616 37.2765C53.5845 38.0442 53.3336 38.8677 53.2185 39.7153Z" fill="#9999FF" />
                </g>
                <defs>
                  <clipPath id="after_effects__clip0_912_9">
                    <rect width="82.0513" height="80" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Year</span>
            <p className="text-lg font-medium mt-2">{content.year}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VideoEditing;
