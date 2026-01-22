import React from "react";
import GlareHover from "./GlareHover";
import ShinyText from "./ShinyText";

const About = () => {
    return (
        <section id="about" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image side */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent/20 via-muted to-secondary overflow-hidden animate-fade-up-scroll">
                            <GlareHover
                                width="100%"
                                height="100%"
                                borderRadius="1.875rem"
                                borderColor="transparent"
                                background="transparent"
                                className="w-full h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                                <img
                                    src="/1000103443.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                            </GlareHover>
                        </div>
                        {/* Floating card */}
                        <div className="absolute -bottom-6 -right-6 bg-card shadow-2xl p-6 max-w-[240px] rounded-3xl border border-border/10">
                            <p className="text-3xl font-bold text-[#00D2AA] dark:text-blue-500 mb-1">3</p>
                            <p className="text-sm text-foreground/80 font-medium">Years of experience</p>
                        </div>
                    </div>

                    {/* Content side */}
                    <div>
                        <span className="text-accent text-sm font-medium uppercase tracking-widest block animate-fade-up-scroll">Designing Visions, Editing Realities</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 leading-tight animate-fade-up-scroll">
                            <ShinyText
                                text="Hello, I am"
                                speed={3}
                                color="rgba(255, 255, 255, 0.8)"
                                shineColor="#3b82f6"
                                className="text-3xl md:text-4xl py-0.5"
                            />
                            <br />
                            <ShinyText
                                text="Muhammed Suhail"
                                speed={3}
                                color="rgba(255, 255, 255, 0.8)"
                                shineColor="#3b82f6"
                                className="py-0.0001"
                            />
                        </h2>
                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <div className="animate-fade-up-scroll">
                                <ShinyText
                                    text=" A self-taught and passionate Graphic Designer and Video Editor based in Malappuram, Kerala, India. I have created Numerous Social Media creatives and Printable works, Continually Learning and Researching to Expand my expertise. My exploration spans various fields of graphic design, including Video Editing"
                                    speed={5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    shineColor="#ffffff"
                                />
                            </div>
                            <div className="animate-fade-up-scroll">
                                <ShinyText
                                    text="As a designer, I excel at creating innovative designs and delivering compelling presentations. My passion also extends to mentoring and instructing aspiring graphic designers, helping them develop their skills and achieve their creative potential."
                                    speed={5}
                                    color="rgba(255, 255, 255, 0.6)"
                                    shineColor="#ffffff"
                                />
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-border animate-fade-up-scroll">
                            <p className="text-lg italic text-foreground/80">
                                "Design is not just what it looks like, it's how it works."
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">— Muhammed Suhail </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
