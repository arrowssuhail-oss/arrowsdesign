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
                        d="M1.7 19L9.3 19C11.2 19 12.8 17.4 12.8 15.5C12.8 13.6 11.2 12 9.2 12L2.2 12L8.9 12C10.8 12 12.4 10.4 12.4 8.5C12.4 6.6 10.8 5 8.9 5L1.7 5Z"
                        animate={controls}
                        initial="normal"
                        variants={VARIANTS}
                    />
                    <motion.path
                        d="M15.9 14.3L22.3 14.3C22.3 14.3 22.3 10.4 19.1 10.4C16.1 10.4 15.3 12.6 15.3 14.6C15.3 16.6 16.2 18.3 19.1 18.3C22.2 18.3 22.2 16.2 22.2 16.2"
                        animate={controls}
                        initial="normal"
                        variants={VARIANTS}
                    />
                    <motion.path
                        d="M16.4 7.2L21.2 7.2"
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
