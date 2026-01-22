import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

interface ProjectCarouselProps {
    images: (string | { type: 'video'; url: string; thumbnail: string } | { type: 'image'; url: string; overlay?: string })[]
    className?: string
    href?: string
    autoplay?: boolean
}

const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);
const isDriveLink = (src: string) => src.includes('drive.google.com');

export function ProjectCarousel({ images, className, href, autoplay = true }: ProjectCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    // Auto-play
    React.useEffect(() => {
        if (!api || !autoplay) return;

        const interval = setInterval(() => {
            api.scrollNext()
        }, 5000)

        return () => clearInterval(interval)
    }, [api, autoplay])

    if (!images || images.length === 0) return null;

    const renderItem = (img: string | { type: 'video'; url: string; thumbnail: string } | { type: 'image'; url: string; overlay?: string }) => {
        const isObj = typeof img === 'object';
        const src = isObj ? img.url : img;
        const thumbnail = isObj && 'thumbnail' in img ? img.thumbnail : null;
        const overlay = isObj && 'overlay' in img ? img.overlay : null;

        // 1. Google Drive Link Logic
        if (isDriveLink(src)) {
            return (
                <div className="w-full h-full relative flex items-center justify-center bg-muted/30 group/card">
                    {thumbnail && (
                        <div className="absolute inset-0">
                            <img
                                src={thumbnail}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/30 transition-colors" />
                        </div>
                    )}
                    <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/play z-10 flex flex-col items-center gap-4 transition-transform hover:scale-105"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover/play:bg-white/30 transition-all shadow-xl">
                            <Play className="w-8 h-8 ml-1 text-white fill-white" />
                        </div>
                        <span className="text-sm font-medium text-white uppercase tracking-widest px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
                            Watch on Google Drive
                        </span>
                    </a>
                </div>
            );
        }

        // 2. Standard Video Logic
        if (isVideo(src)) {
            return (
                <video
                    src={src}
                    controls
                    className="w-full h-full object-contain"
                />
            );
        }

        // 3. Standard Image Logic with Overlay
        return (
            <div className="w-full h-full relative">
                <img
                    src={src}
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
                {overlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="px-8 py-4 bg-background/10 border border-amber-500/30 rounded-xl backdrop-blur-md shadow-2xl skew-x-[-10deg] hover:skew-x-0 transition-transform duration-500 group/overlay">
                            <h3 className="text-amber-500 text-2xl md:text-4xl font-black uppercase tracking-[0.2em] skew-x-[10deg] group-hover/overlay:skew-x-0 transition-transform duration-500">
                                {overlay}
                            </h3>
                            <div className="hidden md:block absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/50" />
                            <div className="hidden md:block absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/50" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Carousel setApi={setApi} className={cn("w-full relative group", className)} opts={{ loop: true }}>
            <CarouselContent>
                {images.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-video relative rounded-3xl overflow-hidden bg-muted/20 flex items-center justify-center">
                            {href ? (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full cursor-pointer"
                                >
                                    {renderItem(img)}
                                </a>
                            ) : (
                                renderItem(img)
                            )}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <>
                    <CarouselPrevious className="left-4 bg-background/80 hover:bg-background border-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="right-4 bg-background/80 hover:bg-background border-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-colors",
                                    current === idx ? "bg-white" : "bg-white/50"
                                )}
                                onClick={() => api?.scrollTo(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </Carousel>
    )
}
