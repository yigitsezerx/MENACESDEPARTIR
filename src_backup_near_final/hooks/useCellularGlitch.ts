import { useState, useRef, useCallback, useEffect } from 'react';

const CELL_CHARS = '.:+*#@';

interface UseCellularGlitchProps {
    text: string;
    iterations?: number;
    speed?: number;
}

export const useCellularGlitch = ({ text, iterations = 10, speed = 50 }: UseCellularGlitchProps) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<number | null>(null);
    const originalTextRef = useRef(text);

    useEffect(() => {
        originalTextRef.current = text;
        setDisplayText(text);
    }, [text]);

    const trigger = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        let count = 0;

        intervalRef.current = window.setInterval(() => {
            setDisplayText(prev => {
                return prev.split('').map((_, i) => {
                    // Respect spaces (structure)
                    if (originalTextRef.current[i] === ' ') return ' ';

                    // Higher chance to restore as we near end
                    if (count > iterations * 0.7) {
                        if (Math.random() < 0.5) return originalTextRef.current[i];
                    }

                    // Random mutation
                    return CELL_CHARS[Math.floor(Math.random() * CELL_CHARS.length)];
                }).join('');
            });

            count++;
            if (count >= iterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(originalTextRef.current);
            }
        }, speed);

    }, [iterations, speed]);

    return { displayText, trigger };
};
