"use client";

import { ArrowLeft, ChartNoAxesGantt, CheckCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { defaultPageContent, ProjectPageData } from "@/components/projectData";
import { db } from "@/lib/storage";
import { ProjectCarousel } from "@/components/ProjectCarousel";

const HumanCenteredDesign = () => {
  const [content, setContent] = useState<ProjectPageData>(defaultPageContent[3]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const stored = await db.getItem<ProjectPageData>("arrows_page_content_3");
        if (stored) setContent(stored);
      } catch (e) {
        console.error("Failed to load content", e);
      }
    };
    loadContent();

    const handleUpdate = () => loadContent();
    window.addEventListener("page-content-update-3", handleUpdate);
    return () => window.removeEventListener("page-content-update-3", handleUpdate);
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
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <ChartNoAxesGantt className="w-8 h-8 text-accent" />
            </div>
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-widest">UI/UX Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">{content.heroTitle}</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {allImages.length === 0 ? (
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute w-64 h-64 rounded-lg bg-foreground/5 animate-float" style={{ top: '10%', left: '60%' }} />
              <div className="absolute w-40 h-40 rounded-full bg-foreground/10 animate-float" style={{ top: '50%', left: '20%', animationDelay: '0.5s' }} />
              <div className="absolute w-32 h-32 rounded-md bg-foreground/5 animate-float" style={{ top: '30%', left: '40%', animationDelay: '1s' }} />
              <ChartNoAxesGantt className="w-32 h-32 text-foreground/40" />
            </div>
          ) : (
            <ProjectCarousel images={allImages} />
          )}
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
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
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
              <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                {/* Figma */}
                <svg viewBox="0 0 54 80" fill="none" className="h-8 w-auto">
                  <g clipPath="url(#figma__clip0_912_3)">
                    <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83" />
                    <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF" />
                    <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E" />
                    <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262" />
                    <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE" />
                  </g>
                  <defs>
                    <clipPath id="figma__clip0_912_3">
                      <rect width="53.3333" height="80" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a href="https://wordpress.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                {/* WordPress */}
                <svg viewBox="0 0 122.52 122.523" className="h-8 w-auto">
                  <g fill="#21759b">
                    <path d="m8.708 61.26c0 20.802 12.089 38.779 29.619 47.298l-25.069-68.686c-2.916 6.536-4.55 13.769-4.55 21.388z" />
                    <path d="m96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501l19.138 56.925 11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z" />
                    <path d="m62.184 65.857-15.768 45.819c4.708 1.384 9.687 2.141 14.846 2.141 6.12 0 11.989-1.058 17.452-2.979-.141-.225-.269-.464-.374-.724z" />
                    <path d="m107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.426.001-9.137-2.333-17.729-6.438-25.215z" />
                    <path d="m61.262 0c-33.779 0-61.262 27.481-61.262 61.26 0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263-.001-33.779-27.487-61.26-61.265-61.26zm0 119.715c-32.23 0-58.453-26.223-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z" />
                  </g>
                </svg>
              </a>
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

export default HumanCenteredDesign;
