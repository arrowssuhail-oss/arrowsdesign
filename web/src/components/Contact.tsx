"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { sendContactEmail } from '@/actions/contact';

import { AnimatedIcon, AnimatedIconHandle } from '@/components/ui/animated-icon';
import { useRef } from 'react';

const ContactInfoCard = ({ item, index }: { item: any, index: number }) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  const content = (
    <Card
      className="rounded-3xl border-border/50 hover:border-accent/30 transition-all duration-500 bg-card hover-lift group"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <CardContent className="p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
          <AnimatedIcon
            ref={iconRef}
            name={item.iconName}
            className="w-7 h-7 text-accent"
            size={28}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
          <p className="text-lg font-medium group-hover:text-accent transition-colors duration-300">{item.value}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {item.href ? (
        <a href={item.href} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);

    try {
      const result = await sendContactEmail(formDataObj);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message", {
          description: result.message || "Please try again later or use the direct email link.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later or use the direct email link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      iconName: 'Mail',
      label: 'Email',
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com',
      href: isMobile
        ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com'}`
        : `https://mail.google.com/mail/?view=cm&fs=1&to=${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com'}`
    },
    { iconName: 'Phone', label: 'Phone', value: '+91 9567438507', href: 'tel:+919567438507' },
    { iconName: 'MapPin', label: 'Location', value: 'Malappuram, Kerala' },
  ];

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-[2.5rem] border-border/50 shadow-elegant bg-card hover-lift transition-all duration-500 hover:border-accent/30 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              <CardContent className="p-8 relative">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-[280px]">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        required
                        className={`rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'ring-2 ring-primary shadow-glow' : ''
                          }`}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        required
                        className={`rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-primary shadow-glow' : ''
                          }`}
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project..."
                        required
                        rows={6}
                        className={`rounded-xl transition-all duration-300 resize-none ${focusedField === 'message' ? 'ring-2 ring-primary shadow-glow' : ''
                          }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-accent transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold tracking-tight text-left">
                Get in Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed text-left">
                Whether you have a question, want to discuss a project, or just want to say hi, I'll try my best to get back to you as soon as possible!
              </p>
            </motion.div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <ContactInfoCard key={item.label} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
