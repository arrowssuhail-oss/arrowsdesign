import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <Hero />
          <Work />
          <Skills />
          <Resume />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}