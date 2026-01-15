"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BehanceIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface BehanceIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

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

const BehanceIcon = forwardRef<BehanceIconHandle, BehanceIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => {
                    controls.start("animate");
                },
                stopAnimation: () => {
                    controls.start("normal");
                },
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

        return (
            <div
                className={cn("cursor-pointer flex items-center justify-center", className)}
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
                    <motion.path
                        d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5"
                        animate={controls}
                        initial="normal"
                        variants={VARIANTS}
                    />
                    <motion.path
                        d="M14 13h7a3.5 3.5 0 0 0 -7 0v1a3.5 3.5 0 0 0 7 0"
                        animate={controls}
                        initial="normal"
                        variants={VARIANTS}
                    />
                    <motion.path
                        d="M14 8h7"
                        animate={controls}
                        initial="normal"
                        variants={VARIANTS}
                    />
                </svg>
            </div>
        );
    }
);

BehanceIcon.displayName = "BehanceIcon";

export { BehanceIcon };
