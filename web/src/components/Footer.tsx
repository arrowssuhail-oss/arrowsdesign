"use client";

import Link from "next/link";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { LinkIcon } from "@/components/ui/link-icon";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { BehanceIcon } from "@/components/ui/behance-icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const socials = [
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/suhailbinsaidalavi/", label: "LinkedIn" },
    { icon: BehanceIcon, href: "https://www.behance.net/ArrowsSuhail", label: "Adobe Behance" },
    { icon: InstagramIcon, href: "https://www.instagram.com/arrows.in_/", label: "Instagram" },
    { icon: LinkIcon, href: "https://linktr.ee/arrows.suhail?utm_source=linktree_profile_share&ltsid=e2729df1-4401-42a8-b1e9-c9f141fda649", label: "Linktree" },
];

const Footer = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <footer className="py-12 border-t border-border/40 bg-background">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                <Link href="/" className="mb-6 block h-14 w-auto hover:opacity-80 transition-opacity">
                    <img
                        src={theme === "light" ? "/logo dark.png" : "/logo white.png"}
                        alt="Arrows Design"
                        className="h-full w-auto object-contain"
                    />
                </Link>

                <div className="flex gap-6 mb-8">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-accent/5 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5 cursor-pointer" size={20} />
                        </a>
                    ))}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Arrows Design. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
