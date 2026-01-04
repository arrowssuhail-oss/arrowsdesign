"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

const skills = [
  { name: 'Figma', level: 'Expert' },
  { name: 'Photoshop', level: 'Advanced' },
  { name: 'UI/UX Design', level: 'Expert' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 sm:px-8 lg:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Badge
                className="px-8 py-4 text-base font-semibold rounded-full shadow-card hover:shadow-elegant transition-all duration-300 cursor-default"
                variant="outline"
              >
                <span className="mr-2">{skill.name}</span>
                <span className="text-xs text-muted-foreground">• {skill.level}</span>
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
