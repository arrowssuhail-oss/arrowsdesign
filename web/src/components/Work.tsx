"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Login Page',
    description: 'Clean and modern authentication interface with smooth form validation and micro-interactions.',
    tags: ['UI Design', 'Forms', 'Animation'],
    color: 'from-primary/10 to-primary/5',
  },
  {
    id: 2,
    title: 'Payment Page',
    description: 'Secure payment flow with trust indicators, card validation, and seamless checkout experience.',
    tags: ['E-commerce', 'Security', 'UX'],
    color: 'from-primary/15 to-primary/5',
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Comprehensive admin panel with data visualization, real-time updates, and intuitive navigation.',
    tags: ['Dashboard', 'Data Viz', 'Complex UI'],
    color: 'from-primary/10 to-primary/5',
  },
  {
    id: 4,
    title: 'User Dashboard',
    description: 'Personalized user interface focusing on accessibility, clarity, and delightful user experience.',
    tags: ['Dashboard', 'Personalization', 'Accessibility'],
    color: 'from-primary/12 to-primary/5',
  },
  {
    id: 5,
    title: 'Privacy Policy',
    description: 'Editorial typography-focused design making legal content readable and user-friendly.',
    tags: ['Typography', 'Content', 'Readability'],
    color: 'from-primary/8 to-primary/5',
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 sm:px-8 lg:px-12">
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
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of recent projects showcasing design excellence and technical craftsmanship.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden rounded-2xl border-border/50 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-elegant">
                <CardContent className="p-8 space-y-6 h-full flex flex-col">
                  {/* Project Visual Placeholder */}
                  <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
