"use client";

import { Palette, Layout, PenTool, Monitor, Layers, Sparkles, Video } from "lucide-react";
import { db } from "@/lib/storage";

const skills = [
  { name: "Adobe Creative Suite", iconName: "PenTool", description: "Photoshop, Illustrator & more" },
  { name: "UI/UX Design", iconName: "Layout", description: "WordPress, Figma (Learning)" },
  { name: "Graphic Design", iconName: "Palette", description: "Photoshop, Illustrator" },
  { name: "Illustration", iconName: "PenTool", description: "Custom graphics" },
  { name: "Web Design", iconName: "Monitor", description: "Google Antigravity" },
  { name: "Design Systems", iconName: "Layers", description: "Refference" },
  { name: "AI Tools", iconName: "Sparkles", description: "Latest AI Models" },
  { name: "Video Editing", iconName: "Video", description: "Premiere Pro, After Effects, DaVinci Resolve" },
];

import { AnimatedIcon, AnimatedIconHandle } from "@/components/ui/animated-icon";
import { useRef } from "react";

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <div
      className="bg-card border border-border/50 p-6 rounded-3xl hover-lift group cursor-default animate-fade-up-scroll h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <AnimatedIcon
          ref={iconRef}
          name={skill.iconName}
          className="w-6 h-6 text-accent"
          size={24}
        />
      </div>
      <h3 className="font-semibold mb-1">{skill.name}</h3>
      <p className="text-sm text-muted-foreground">
        {skill.description}
      </p>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-accent text-sm font-medium uppercase tracking-widest block mb-4">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Tools & expertise
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
