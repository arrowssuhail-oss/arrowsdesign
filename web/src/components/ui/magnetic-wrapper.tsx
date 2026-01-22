"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticWrapperProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the magnetic pull is (default: 0.5)
}

export default function MagneticWrapper({
    children,
    className = "",
    strength = 0.5,
}: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for x and y position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth movement
    // Stiffness and damping control the "weight" and "bounciness"
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        // Calculate center of the element
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Move element towards mouse (multiplied by strength factor)
        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        // Reset to original position
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
