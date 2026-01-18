"use client";

import { Button } from "@/components/ui/button";
import { Badge } from './ui/badge';
import { Download, Laptop } from 'lucide-react';

const experience = [
    {
        title: "Web Designer",
        company: "Arrows.in",
        period: "2025 — Present",
        description: "Crafted high-conversion digital experiences for Fintech and Healthcare clients, focusing on user accessibility and intuitive UI",
    },
    {
        title: "Graphic Designer",
        company: "SkillBee",
        period: "2025 — Present",
        description: "Leading design for core product features and mentoring junior designers",
    },
    {
        title: "Freelance",
        company: "Arrows.in",
        period: "2023 — Present",
        description: "Started My Design career creating brand identities and more",
    },
];

const education = [
    {
        title: "Bachelor in Commerce",
        institution: "Calicut University",
        period: "2025 — Present",
    },
    {
        title: "Commerce",
        institution: "Kerala State Board of Higher Education",
        period: "2022 — 2024",
    },
    {
        title: "SSLC",
        institution: "Kerala State Board of Higher Education",
        period: "2021 — 2022",
    },
];

import { AnimatedIcon, AnimatedIconHandle } from "@/components/ui/animated-icon";
import { useRef } from "react";

const ResumeSection = () => {
    const briefcaseRef = useRef<AnimatedIconHandle>(null);
    const gradCapRef = useRef<AnimatedIconHandle>(null);

    return (
        <section id="resume" className="py-32 px-6 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <span className="text-accent text-sm font-medium uppercase tracking-widest">Resume</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4">
                            Experience & Education
                        </h2>
                    </div>
                    <Button variant="accent" className="mt-6 md:mt-0" asChild>
                        <a href="/MUHAMMED SUHAIL CV.pdf" download="MUHAMMED_SUHAIL_CV.pdf">
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                        </a>
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Experience */}
                    <div
                        onMouseEnter={() => briefcaseRef.current?.startAnimation()}
                        onMouseLeave={() => briefcaseRef.current?.stopAnimation()}
                        className="group/section"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <AnimatedIcon ref={briefcaseRef} name="Briefcase" className="w-5 h-5 text-accent" size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Work Experience</h3>
                        </div>

                        <div className="space-y-0">
                            {experience.map((item, index) => (
                                <div key={index} className="relative pl-8 pb-10 last:pb-0 animate-fade-up-scroll">
                                    {/* Timeline line */}
                                    {index !== experience.length - 1 && (
                                        <div className="absolute left-[11px] top-4 w-px h-full bg-border" />
                                    )}
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                    </div>

                                    <div className="bg-card border border-border/50 p-6 rounded-3xl hover-lift transition-all duration-300 hover:border-accent/30 group">
                                        <span className="text-xs text-accent font-medium">{item.period}</span>
                                        <h4 className="text-lg font-semibold mt-2 group-hover:text-accent transition-colors">{item.title}</h4>
                                        <p className="text-muted-foreground text-sm mt-1">{item.company}</p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div
                        onMouseEnter={() => gradCapRef.current?.startAnimation()}
                        onMouseLeave={() => gradCapRef.current?.stopAnimation()}
                        className="group/section"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <AnimatedIcon ref={gradCapRef} name="GraduationCap" className="w-5 h-5 text-accent" size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Education</h3>
                        </div>

                        <div className="space-y-0">
                            {education.map((item, index) => (
                                <div key={index} className="relative pl-8 pb-10 last:pb-0 animate-fade-up-scroll">
                                    {/* Timeline line */}
                                    {index !== education.length - 1 && (
                                        <div className="absolute left-[11px] top-4 w-px h-full bg-border" />
                                    )}
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                    </div>

                                    <div className="bg-card border border-border/50 p-6 rounded-3xl hover-lift transition-all duration-300 hover:border-accent/30 group">
                                        <span className="text-xs text-accent font-medium">{item.period}</span>
                                        <h4 className="text-lg font-semibold mt-2 group-hover:text-accent transition-colors">{item.title}</h4>
                                        <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeSection;
