"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu";
import { defaultProjects } from "./Projects";

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
  const [activeHash, setActiveHash] = useState("");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // Determine active section based on path or hash
    const getActiveHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash) return hash;
      if (path === "/") return "#about"; // Default for home
      if (path.startsWith("/project")) return "#works"; // Project pages -> Projects nav
      if (path.startsWith("/resume")) return "#resume"; // Resume page -> Resume nav
      return "";
    };

    setActiveHash(getActiveHash());

    const handleHashChange = () => setActiveHash(getActiveHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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

  const pathname = usePathname();

  const handleNavClick = (_: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      setActiveHash(href.substring(1));
    }
  };

  return (
    <>
      <nav className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4",
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      )}>
        <div className={cn(
          "relative max-w-[95%] xl:max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border border-black/5 dark:border-white/10"
            : "bg-transparent border-transparent shadow-none"
        )}>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => handleNavClick(e, "/#hero")}
            >
              <img
                src={theme === "light" ? "/logo dark.png" : "/logo white.png"}
                alt="arrows.in logo"
                className="h-12 w-auto object-contain transition-all duration-300"
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

          {/* Centered Desktop Nav - REPLACED WITH MENU */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
            {/* Using transparent Menu to just get the grouping/behavior if any, mostly allows generic structure */}
            <Menu setActive={setActive} className="bg-transparent dark:bg-transparent shadow-none border-none py-0 px-0">
              {navLinks.map(link => {
                const isActive = activeHash === link.href.substring(1);

                if (link.name === "Projects") {
                  return (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item={link.name}
                      href={link.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
                      className={cn(
                        isActive ? "text-foreground font-bold underline decoration-2 underline-offset-8 decoration-foreground" : "text-muted-foreground font-medium"
                      )}
                    >
                      <div className="text-sm grid grid-cols-2 gap-10 p-4 w-[800px]">
                        {defaultProjects.map((project) => (
                          <ProductItem
                            key={project.id}
                            title={project.category}
                            href={project.link}
                            src={project.image}
                            description={project.title}
                          />
                        ))}
                      </div>
                    </MenuItem>
                  );
                }

                return (
                  <HoveredLink
                    key={link.name}
                    href={link.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
                    className={cn(
                      "text-sm transition-colors hover:text-foreground",
                      isActive ? "text-foreground font-bold underline decoration-2 underline-offset-8 decoration-foreground" : "text-muted-foreground font-medium"
                    )}
                    onMouseEnter={() => setActive(null)}
                  >
                    {link.name}
                  </HoveredLink>
                )
              })}
            </Menu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && <div className="md:hidden mt-2 mx-auto max-w-[95%] xl:max-w-screen-2xl glass-card p-6 animate-fade-up bg-background/95 backdrop-blur-lg rounded-3xl border border-white/10 shadow-xl">
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
      {/* Custom Page Transition Overlay for Hash Links */}


      <StoryViewer
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        storyData={storyData}
      />
    </>
  );
};
export default Navbar;
