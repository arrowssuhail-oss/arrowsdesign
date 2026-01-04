import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download, Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    id: 1,
    type: 'work',
    title: 'Senior UI/UX Designer',
    company: 'Premium Digital Agency',
    period: '2022 - Present',
    description: 'Leading design initiatives for high-profile clients, focusing on user-centered design and innovative solutions.',
  },
  {
    id: 2,
    type: 'work',
    title: 'Frontend Developer',
    company: 'Tech Startup',
    period: '2020 - 2022',
    description: 'Built responsive web applications with modern frameworks, emphasizing performance and accessibility.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor in Computer Science',
    company: 'University of Design',
    period: '2016 - 2020',
    description: 'Specialized in Human-Computer Interaction and Visual Design.',
  },
];

export default function Resume() {
  const handleDownload = () => {
    // Mock download - in production, this would download an actual CV file
    alert('CV download initiated! (This is a demo)');
  };

  return (
    <section id="resume" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-border">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline Icon */}
              <div className="absolute left-0 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                {item.type === 'work' ? (
                  <Briefcase className="h-8 w-8 text-primary" />
                ) : (
                  <GraduationCap className="h-8 w-8 text-primary" />
                )}
              </div>

              {/* Content Card */}
              <Card className="rounded-2xl border-border/50 shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                      <p className="text-primary font-medium">{item.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Download CV Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={handleDownload}
            size="lg"
            className="group rounded-full px-8 py-6 text-base font-semibold shimmer"
          >
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Download CV
          </Button>
        </motion.div>
      </div>
    </section>
  );
}