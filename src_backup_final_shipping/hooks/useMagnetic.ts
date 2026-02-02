import { useRef, useEffect, useState } from 'react';

export const useMagnetic = (settings = { strength: 0.5, range: 100 }) => {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < settings.range) {
                // Magnetic pull
                const x = deltaX * settings.strength;
                const y = deltaY * settings.strength;
                setPosition({ x, y });
            } else {
                // Return to center
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [settings.strength, settings.range]);

    return { ref, style: { transform: `translate(${position.x}px, ${position.y}px)` } };
};
