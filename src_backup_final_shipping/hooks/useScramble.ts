import { useState, useEffect, useRef } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface UseScrambleProps {
    text: string;
    speed?: number;
    delay?: number;
    enabled?: boolean;
}

export const useScramble = ({ text, speed = 40, delay = 0, enabled = true }: UseScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const iterationRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const startScramble = () => {
            clearInterval(intervalRef.current as number);
            iterationRef.current = 0;

            intervalRef.current = window.setInterval(() => {
                setDisplayText(() =>
                    text.split('').map((_, index) => {
                        if (index < iterationRef.current) {
                            return text[index];
                        }
                        // Random tech char
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join('')
                );

                if (iterationRef.current >= text.length) {
                    clearInterval(intervalRef.current as number);
                }

                iterationRef.current += 1 / 3; // Control resolution speed
            }, speed);
        };

        const timeout = setTimeout(startScramble, delay);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed, delay, enabled]);

    return displayText;
};
