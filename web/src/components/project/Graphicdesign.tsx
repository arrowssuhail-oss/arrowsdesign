"use client";
import { ArrowLeft, Palette, CheckCircle, ChevronLeft, ChevronRight, X, Maximize2, ZoomIn } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback } from "react";
import { defaultPageContent, ProjectPageData } from "@/components/projectData";
import { db } from "@/lib/storage";

const Identity = () => {
    const [content, setContent] = useState<ProjectPageData>(defaultPageContent[1]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(8);


    useEffect(() => {
        const loadContent = async () => {
            try {
                const stored = await db.getItem<ProjectPageData>("arrows_page_content_1");
                if (stored) setContent(stored);
            } catch (e) {
                console.error("Failed to load content", e);
            }
        };
        loadContent();

        // Listen for updates from Dashboard
        const handleUpdate = () => loadContent();
        window.addEventListener("page-content-update-1", handleUpdate);
        return () => window.removeEventListener("page-content-update-1", handleUpdate);
    }, []);

    const allImages = [content.heroImage, ...(content.gallery || [])].filter(Boolean);

    const handleNext = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
    }, [allImages.length]);

    const handlePrev = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
    }, [allImages.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="w-full max-w-[95%] xl:max-w-screen-2xl mx-auto px-4">
                    <Link href="/#works" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <div className="flex flex-col gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                                <Palette className="w-8 h-8 text-rose-500" />
                            </div>
                            <div>
                                <span className="text-rose-500 text-sm font-medium uppercase tracking-widest">Graphic Design</span>
                                <h1 className="text-4xl md:text-6xl font-bold mt-2 leading-tight">{content.heroTitle}</h1>
                            </div>
                        </div>

                        <div className="md:pb-2">
                            <p className="text-xl text-muted-foreground">
                                {content.heroDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Visual */}
            <section className="px-6 pb-16">
                <div className="w-full px-4">
                    {allImages.length === 0 ? (
                        <div className="aspect-video rounded-3xl bg-gradient-to-br from-rose-500/30 to-rose-500/5 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute w-48 h-48 rounded-full bg-foreground/5 animate-float" style={{ top: '15%', left: '65%' }} />
                            <div className="absolute w-36 h-36 rounded-lg bg-foreground/10 animate-float" style={{ top: '55%', left: '15%', animationDelay: '0.5s' }} />
                            <div className="absolute w-24 h-24 rounded-full bg-foreground/5 animate-float" style={{ top: '25%', left: '35%', animationDelay: '1s' }} />
                            <Palette className="w-32 h-32 text-foreground/40" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {allImages.slice(0, visibleCount).map((item, index) => {
                                    let imageUrl = '';
                                    if (typeof item === 'string') {
                                        imageUrl = item;
                                    } else if (item.type === 'image') {
                                        imageUrl = item.url;
                                    } else if (item.type === 'video') {
                                        imageUrl = item.thumbnail;
                                    }

                                    if (!imageUrl) return null;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedIndex(index)}
                                            className="group relative overflow-hidden rounded-3xl bg-muted/20 aspect-square cursor-pointer"
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Project image ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>
                                    );
                                })}
                            </div>

                            {visibleCount < allImages.length && (
                                <div className="mt-12 flex justify-center">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 4)}
                                        className="px-8 py-3 rounded-full bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section >

            {/* Project Details */}
            < section className="px-6 py-16" >
                <div className="w-full px-4 grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {content.challenge}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6">The Solution</h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {content.solution}
                        </p>
                    </div>
                </div>
            </section >

            {/* Deliverables */}
            < section className="px-6 py-16 bg-muted/30" >
                <div className="w-full max-w-[95%] xl:max-w-screen-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12">Deliverables</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {content.features.map((feature, index) => (
                            <div key={index} className="bg-[#0B1221] p-6 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-rose-500/50 transition-colors group">
                                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center mb-2 group-hover:bg-rose-500/20 transition-colors">
                                    <CheckCircle className="w-5 h-5 text-rose-500" />
                                </div>
                                <h3 className="text-white font-medium leading-tight">{feature}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Professional grade deliverable included in this package.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Project Info */}
            < section className="px-6 py-16" >
                <div className="w-full max-w-[95%] xl:max-w-screen-2xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Role</span>
                        <p className="text-lg font-medium mt-2">{content.role}</p>
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
                        <p className="text-lg font-medium mt-2">{content.timeline}</p>
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
                        <div className="flex items-center gap-4 mt-2">
                            {/* Photoshop */}
                            <svg viewBox="0 0 83 80" fill="none" className="h-8 w-auto">
                                <g clipPath="url(#photoshop__clip0_906_1855)">
                                    <path d="M67.5214 0H14.5299C6.50526 0 0 6.50526 0 14.5299V65.4701C0 73.4947 6.50526 80 14.5299 80H67.5214C75.546 80 82.0513 73.4947 82.0513 65.4701V14.5299C82.0513 6.50526 75.546 0 67.5214 0Z" fill="#001E36" />
                                    <path d="M18.4758 56.1007V20.9284C18.4758 20.6721 18.5859 20.5431 18.8061 20.5431C19.3926 20.5431 19.928 20.5345 20.7357 20.5156C21.5425 20.4975 22.414 20.4792 23.3502 20.4606C24.286 20.4424 25.2768 20.4241 26.3226 20.4055C27.3683 20.3874 28.4049 20.3783 29.4324 20.3779C32.2207 20.3779 34.5692 20.7265 36.4778 21.4238C38.1996 22.0062 39.7697 22.9651 41.074 24.2309C42.1797 25.3281 43.0341 26.6521 43.5784 28.1115C44.0933 29.5318 44.3542 31.0316 44.3491 32.5424C44.3491 35.4786 43.6702 37.9005 42.3125 39.808C40.9458 41.7235 39.0247 43.1739 36.8082 43.9638C34.4964 44.8264 31.9274 45.1189 29.1022 45.1189C28.2946 45.1189 27.7258 45.1098 27.3958 45.0914C27.0656 45.0733 26.5703 45.0641 25.9098 45.0639V56.0457C25.9194 56.113 25.9132 56.1816 25.8917 56.2461C25.8702 56.3106 25.834 56.3692 25.7859 56.4172C25.7378 56.4653 25.6792 56.5015 25.6147 56.523C25.5502 56.5445 25.4816 56.5507 25.4143 56.5411H18.8611C18.604 56.5411 18.4758 56.3948 18.4758 56.1007ZM25.9098 27.1482V38.62C26.3862 38.657 26.8265 38.6753 27.2307 38.675H29.0471C30.3836 38.6706 31.7113 38.4586 32.9828 38.0467C34.0732 37.7228 35.0476 37.0923 35.7899 36.2303C36.5054 35.3866 36.8632 34.2124 36.8633 32.7076C36.8923 31.6428 36.6153 30.5921 36.065 29.6802C35.4866 28.7983 34.6506 28.1161 33.6707 27.7262C32.3913 27.2289 31.0246 26.9949 29.6526 27.0382C28.7718 27.0382 27.9921 27.0473 27.3134 27.0656C26.6339 27.0846 26.1661 27.1121 25.9098 27.1482Z" fill="#31A8FF" />
                                    <path d="M65.6311 36.534C64.5967 36.0025 63.495 35.6137 62.3561 35.3781C61.1011 35.0902 59.8181 34.9425 58.5306 34.9377C57.8342 34.9189 57.1387 35.0023 56.4665 35.1855C56.0386 35.2807 55.6583 35.5245 55.3931 35.8735C55.2137 36.1526 55.1182 36.4774 55.118 36.8092C55.128 37.1311 55.2441 37.4407 55.4482 37.6899C55.7697 38.066 56.1626 38.3747 56.604 38.5981C57.3888 39.0207 58.1975 39.3975 59.0259 39.7265C60.8732 40.3449 62.6384 41.1858 64.2825 42.2309C65.4025 42.9378 66.3293 43.9119 66.9796 45.0656C67.5265 46.1581 67.8003 47.3669 67.7778 48.5884C67.8107 50.2013 67.3498 51.7858 66.4568 53.1294C65.5007 54.4933 64.1728 55.5537 62.6312 56.1842C60.961 56.9179 58.8969 57.2849 56.439 57.2851C54.8775 57.3009 53.3186 57.1533 51.7878 56.8448C50.5818 56.6236 49.4077 56.2539 48.2926 55.7439C48.1722 55.6818 48.0721 55.5867 48.0039 55.4697C47.9356 55.3527 47.9021 55.2187 47.9073 55.0834V49.1388C47.9007 49.0806 47.91 49.0217 47.9342 48.9683C47.9585 48.915 47.9968 48.8693 48.045 48.836C48.0923 48.8093 48.1466 48.7976 48.2006 48.8026C48.2547 48.8075 48.306 48.8288 48.3477 48.8636C49.6646 49.6401 51.0945 50.2065 52.5859 50.5424C53.9005 50.8719 55.2489 51.0473 56.604 51.0653C57.8881 51.0653 58.833 50.9001 59.4387 50.5699C59.7123 50.4447 59.9437 50.2429 60.1049 49.9889C60.2661 49.7349 60.3502 49.4396 60.347 49.1388C60.347 48.6623 60.0718 48.2037 59.5214 47.7627C58.971 47.3224 57.8518 46.7903 56.1637 46.1664C54.4354 45.5649 52.7967 44.7317 51.2924 43.6896C50.2165 42.9413 49.3305 41.9516 48.7054 40.7998C48.1641 39.7152 47.8904 38.5167 47.9073 37.3046C47.9042 35.8482 48.3043 34.4194 49.0632 33.1764C49.9284 31.8076 51.1709 30.718 52.641 30.039C54.2553 29.2322 56.2735 28.8286 58.6958 28.828C60.1143 28.8166 61.5315 28.9178 62.934 29.1307C63.9497 29.2596 64.9426 29.5281 65.8847 29.9289C65.9594 29.9503 66.0281 29.9888 66.0854 30.0413C66.1427 30.0939 66.1871 30.159 66.2149 30.2316C66.2521 30.366 66.2706 30.5049 66.27 30.6444V36.2037C66.2738 36.2684 66.2605 36.333 66.2316 36.3909C66.2026 36.4489 66.1589 36.4982 66.1049 36.534C66.0313 36.5706 65.9502 36.5897 65.868 36.5897C65.7858 36.5897 65.7047 36.5706 65.6311 36.534Z" fill="#31A8FF" />
                                </g>
                                <defs>
                                    <clipPath id="photoshop__clip0_906_1855">
                                        <rect width="82.0513" height="80" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            {/* Illustrator */}
                            <svg viewBox="0 0 83 80" fill="none" className="h-8 w-auto">
                                <g clipPath="url(#illustrator__clip0_906_1865)">
                                    <path d="M67.5214 0H14.5299C6.50526 0 0 6.50526 0 14.5299V65.4701C0 73.4947 6.50526 80 14.5299 80H67.5214C75.546 80 82.0513 73.4947 82.0513 65.4701V14.5299C82.0513 6.50526 75.546 0 67.5214 0Z" fill="#330000" />
                                    <path d="M39.7607 48.0096H27.0459L24.4589 56.0459C24.4237 56.1924 24.3384 56.3221 24.2178 56.4125C24.0972 56.503 23.9489 56.5485 23.7984 56.5413H17.3584C16.9911 56.5413 16.8627 56.3395 16.9731 55.9358L27.9815 24.2312C28.0917 23.901 28.2018 23.5249 28.3119 23.1028C28.4559 22.3684 28.5296 21.622 28.5321 20.8736C28.5246 20.8213 28.5294 20.7679 28.5461 20.7178C28.5629 20.6676 28.591 20.6221 28.6284 20.5847C28.6658 20.5473 28.7114 20.5191 28.7615 20.5024C28.8117 20.4856 28.865 20.4808 28.9174 20.4883H37.669C37.9255 20.4883 38.0722 20.58 38.1094 20.7635L50.6042 55.9908C50.7143 56.3581 50.6041 56.5416 50.2739 56.5413H43.1183C42.9954 56.5549 42.8717 56.5233 42.7704 56.4524C42.6692 56.3815 42.5971 56.2761 42.5679 56.156L39.7607 48.0096ZM29.0274 41.0743H37.7241C37.504 40.3407 37.2471 39.515 36.9536 38.5973C36.6594 37.6805 36.3476 36.6989 36.0179 35.6525C35.6876 34.6068 35.3572 33.561 35.027 32.5151C34.6968 31.4693 34.3941 30.4602 34.1189 29.4877C33.8436 28.5159 33.5959 27.6261 33.3759 26.8182H33.3208C33.0109 28.3048 32.6251 29.7745 32.1649 31.2216C31.6506 32.8729 31.1276 34.5609 30.5961 36.2855C30.0637 38.0108 29.5408 39.6071 29.0274 41.0743Z" fill="#FF9A00" />
                                    <path d="M58.0343 26.3229C57.4729 26.3455 56.9131 26.2493 56.3914 26.0406C55.8697 25.8319 55.398 25.5155 55.007 25.112C54.6171 24.691 54.3142 24.1971 54.1158 23.6587C53.9174 23.1202 53.8274 22.5479 53.851 21.9746C53.831 21.4069 53.9309 20.8414 54.1443 20.315C54.3577 19.7886 54.6798 19.3131 55.0894 18.9197C55.4951 18.5303 55.974 18.2252 56.4984 18.0221C57.0227 17.8189 57.5822 17.7218 58.1443 17.7363C59.4654 17.7363 60.5021 18.1307 61.2543 18.9197C61.634 19.3297 61.9291 19.8105 62.1227 20.3347C62.3163 20.8589 62.4046 21.4162 62.3826 21.9746C62.4056 22.5501 62.3127 23.1245 62.1094 23.6634C61.9061 24.2024 61.5966 24.695 61.1992 25.112C60.7839 25.5214 60.2882 25.8404 59.7435 26.0488C59.1988 26.2572 58.6169 26.3505 58.0343 26.3229ZM54.2362 55.9909V29.6805C54.2362 29.3503 54.3825 29.1851 54.6766 29.1851H61.4469C61.7403 29.1851 61.887 29.3502 61.8873 29.6805V55.9909C61.8873 56.3582 61.7405 56.5416 61.4469 56.5414H54.7317C54.4015 56.5414 54.2364 56.3579 54.2362 55.9909Z" fill="#FF9A00" />
                                </g>
                                <defs>
                                    <clipPath id="illustrator__clip0_906_1865">
                                        <rect width="82.0513" height="80" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Year</span>
                        <p className="text-lg font-medium mt-2">{content.year}</p>
                    </div>
                </div>
            </section >

            {/* Lightbox */}
            {
                selectedIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
                        {/* Controls */}
                        <div className="absolute top-6 right-6 flex items-center gap-4 text-white/70 z-50">
                            <span className="text-sm font-medium">{selectedIndex + 1} / {allImages.length}</span>
                            <button onClick={() => setSelectedIndex(null)} className="p-2 hover:text-white transition-colors rounded-full hover:bg-white/10">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full p-12 flex items-center justify-center" onClick={() => setSelectedIndex(null)}>
                            <img
                                src={
                                    typeof allImages[selectedIndex] === 'string'
                                        ? (allImages[selectedIndex] as string)
                                        : (allImages[selectedIndex] as any).url || (allImages[selectedIndex] as any).thumbnail
                                }
                                alt="Full screen view"
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )
            }

            <Footer />
        </div >
    );
};

export default Identity;
