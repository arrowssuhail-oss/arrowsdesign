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

interface ProjectCarouselProps {
    images: string[]
    className?: string
    href?: string
}

export function ProjectCarousel({ images, className, href }: ProjectCarouselProps) {
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
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext()
        }, 5000)

        return () => clearInterval(interval)
    }, [api])

    if (!images || images.length === 0) return null;

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
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-contain"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                </a>
                            ) : (
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-contain"
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
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
