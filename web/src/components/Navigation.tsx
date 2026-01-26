"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

// Ensure StoryViewer exists or use placeholder
import StoryViewer from "@/components/StoryViewer";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [{
  name: "About",
  href: "/#about"
}, {
  name: "Projects",
  href: "/#works"
}, {
  name: "Skills",
  href: "/#skills"
}, {
  name: "Resume",
  href: "/#resume"
}, {
  name: "Contact",
  href: "/#contact"
}];

const Navbar = ({ stories = [] }: { stories?: any[] }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background transparency
      setIsScrolled(currentScrollY > 50);

      // Handle hide/show on mobile scroll
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px - Hide
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close menu if open
        } else {
          // Scrolling up - Show
          setIsVisible(true);
        }
      } else {
        setIsVisible(true); // Always visible on desktop
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Story State
  const [storyData, setStoryData] = useState<{ content: string; type: 'image' | 'video'; timestamp: number } | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [hasUnseenStory, setHasUnseenStory] = useState(false);

  useEffect(() => {
    // Check passed stories prop first
    if (stories && stories.length > 0) {
      // Filter for active stories (last 24h)
      const now = Date.now();
      const activeStories = stories.filter((s: any) => {
        const storyTime = new Date(s.createdAt).getTime();
        return (now - storyTime) < 24 * 60 * 60 * 1000;
      });

      if (activeStories.length > 0) {
        // Sort by date descending
        activeStories.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const latestStory = activeStories[0];
        const latestTimestamp = new Date(latestStory.createdAt).getTime();

        const data = {
          content: latestStory.mediaUrl,
          type: latestStory.mediaType === 'video' ? 'video' : 'image',
          timestamp: latestTimestamp
        };

        // @ts-ignore
        setStoryData(data);

        // Check availability in local storage for "seen" status
        if (typeof window !== 'undefined') {
          const seenTimestamp = localStorage.getItem("arrows_story_seen");
          setHasUnseenStory(seenTimestamp !== latestTimestamp.toString());
        }
      } else {
        setStoryData(null);
      }
    } else {
      setStoryData(null);
    }

  }, [stories]);

  const handleStoryClick = () => {
    if (!storyData) return;
    setIsStoryOpen(true);
    setHasUnseenStory(false);
    localStorage.setItem("arrows_story_seen", storyData.timestamp.toString());
  };

  const handleLinkClick = (href: string) => {
    // If it's a hash link, we might want to handle smooth scroll manually or let Next.js handle it.
    // Next.js Link handles ID scrolling automatically if it's on the same page.
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        isScrolled ? "py-4" : "py-6",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className={cn("max-w-6xl mx-auto flex items-center justify-between px-7 py-4 rounded-3xl transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-xl shadow-md border border-border/50" : "")}>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img
                src={theme === "light" ? "/logo dark.png" : "/logo white.png"}
                alt="arrows.in logo"
                className="h-19 w-24 object-contain transition-all duration-300"
              />
            </Link>

            {/* Story Ring */}
            {storyData && (
              <button
                onClick={handleStoryClick}
                className="group relative flex items-center justify-center -ml-2 transition-transform hover:scale-105"
              >
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 opacity-100",
                  hasUnseenStory ? "animate-spin-slow p-[2px]" : "p-[1px] grayscale opacity-50"
                )}>
                  <div className="w-full h-full bg-background rounded-full" />
                </div>
                <div className={cn(
                  "relative w-10 h-10 rounded-full border-2 border-background overflow-hidden",
                  hasUnseenStory ? "w-10 h-10" : "w-10 h-10 opacity-80"
                )}>
                  <img src={storyData.content} alt="Story" className="w-full h-full object-cover" />
                </div>
              </button>
            )}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.name}
            </Link>)}

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && <div className="md:hidden mt-2 mx-auto max-w-6xl glass-card p-6 animate-fade-up bg-background/95 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => <Link key={link.name} href={link.href} className="text-foreground py-2 border-b border-border/50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>)}


            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="default" className="mt-2 w-full">
                Let's Talk
              </Button>
            </Link>
            <div className="flex justify-center pt-4 border-t border-border/50">
              <ThemeToggle />
            </div>
          </div>
        </div>}
      </nav>

      {/* Story Overlay */}
      <StoryViewer
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        storyData={storyData}
      />
    </>
  );
};
export default Navbar;
