"use client";

import { motion, useAnimation, Variants } from "motion/react";
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

// --- Icon Data Definitions ---

type IconElement =
    | { type: 'path'; d: string; }
    | { type: 'circle'; cx: string; cy: string; r: string; fill?: string }
    | { type: 'rect'; x?: string; y?: string; width: string; height: string; rx?: string }
    | { type: 'line'; x1: string; x2: string; y1: string; y2: string };

const ICONS: Record<string, IconElement[]> = {
    Palette: [
        { type: 'path', d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" },
        { type: 'circle', cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor" },
        { type: 'circle', cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor" },
        { type: 'circle', cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor" },
        { type: 'circle', cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor" }
    ],
    Layout: [
        { type: 'rect', width: "18", height: "18", x: "3", y: "3", rx: "2" },
        { type: 'path', d: "M3 9h18" },
        { type: 'path', d: "M9 21V9" }
    ],
    PenTool: [
        { type: 'path', d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" },
        { type: 'path', d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" },
        { type: 'path', d: "m2.3 2.3 7.286 7.286" },
        { type: 'circle', cx: "11", cy: "11", r: "2" }
    ],
    Monitor: [
        { type: 'rect', width: "20", height: "14", x: "2", y: "3", rx: "2" },
        { type: 'line', x1: "8", x2: "16", y1: "21", y2: "21" },
        { type: 'line', x1: "12", x2: "12", y1: "17", y2: "21" }
    ],
    Layers: [
        { type: 'path', d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" },
        { type: 'path', d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" },
        { type: 'path', d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }
    ],
    Sparkles: [
        { type: 'path', d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" },
        { type: 'path', d: "M20 2v4" },
        { type: 'path', d: "M22 4h-4" },
        { type: 'circle', cx: "4", cy: "20", r: "2" }
    ],
    Video: [
        { type: 'path', d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" },
        { type: 'rect', x: "2", y: "6", width: "14", height: "12", rx: "2" }
    ],
    Briefcase: [
        { type: 'path', d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" },
        { type: 'rect', width: "20", height: "14", x: "2", y: "6", rx: "2" }
    ],
    GraduationCap: [
        { type: 'path', d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" },
        { type: 'path', d: "M22 10v6" },
        { type: 'path', d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }
    ],
    Mail: [
        { type: 'path', d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" },
        { type: 'rect', x: "2", y: "4", width: "20", height: "16", rx: "2" }
    ],
    MapPin: [
        { type: 'path', d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" },
        { type: 'circle', cx: "12", cy: "10", r: "3" }
    ],
    Phone: [
        { type: 'path', d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }
    ]
};

// --- Animation Logic ---

const VARIANTS: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
        pathOffset: 0,
        transition: {
            duration: 0.4,
            opacity: { duration: 0.1 },
        },
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
        pathOffset: [1, 0],
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            opacity: { duration: 0.1 },
        },
    },
};

export interface AnimatedIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface AnimatedIconProps extends React.HTMLAttributes<HTMLDivElement> {
    name: keyof typeof ICONS; // Ensure only valid names are passed
    size?: number;
}

const AnimatedIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    ({ onMouseEnter, onMouseLeave, className, name, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;
            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseEnter?.(e);
                } else {
                    controls.start("animate");
                }
            },
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e);
                } else {
                    controls.start("normal");
                }
            },
            [controls, onMouseLeave]
        );

        const iconElements = ICONS[name] || [];

        return (
            <div
                className={cn("cursor-pointer flex items-center justify-center select-none", className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <svg
                    fill="none"
                    height={size}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {iconElements.map((el, index) => {
                        const commonProps = {
                            key: index,
                            animate: controls,
                            initial: "normal",
                            variants: VARIANTS,
                        };

                        if (el.type === 'path') {
                            return <motion.path {...commonProps} d={el.d} />;
                        } else if (el.type === 'circle') {
                            return <motion.circle {...commonProps} cx={el.cx} cy={el.cy} r={el.r} fill={el.fill} />;
                        } else if (el.type === 'rect') {
                            return <motion.rect {...commonProps} x={el.x} y={el.y} width={el.width} height={el.height} rx={el.rx} />;
                        } else if (el.type === 'line') {
                            return <motion.line {...commonProps} x1={el.x1} x2={el.x2} y1={el.y1} y2={el.y2} />;
                        }
                        return null;
                    })}
                </svg>
            </div>
        );
    }
);

AnimatedIcon.displayName = "AnimatedIcon";

export { AnimatedIcon };
