import { useState, useEffect, useCallback } from 'react';

export type AnimationMode = 'decrypt' | 'terminal' | 'focus';

const DECRYPT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const useAnimationSelector = (text: string, mode: AnimationMode, options: { delay?: number, speed?: number } = {}) => {
    const [displayText, setDisplayText] = useState(text);
    const [className, setClassName] = useState('');
    const [trigger, setTrigger] = useState(0);
    const { delay = 0, speed = 30 } = options;

    const replay = useCallback(() => setTrigger(prev => prev + 1), []);

    useEffect(() => {
        let interval: number;
        let timeout: number;
        let startTimeout: number;

        // Reset display to "empty" or "scrambled" start state if needed before delay?
        // For decrypt, it usually shows nothing or static until start? 
        // Let's keep it simple: It starts scrambling AFTER delay.

        const startAnimation = () => {
            if (mode === 'focus') {
                setDisplayText(text);
                setClassName('anim-blur-start');
                timeout = setTimeout(() => setClassName('anim-blur-end'), 50);
            } else if (mode === 'terminal') {
                setDisplayText('');
                setClassName('anim-cursor');
                let i = 0;
                interval = window.setInterval(() => {
                    setDisplayText(text.slice(0, i) + '█');
                    i++;
                    if (i > text.length) {
                        setDisplayText(text);
                        clearInterval(interval);
                    }
                }, 50);
            } else if (mode === 'decrypt') {
                setClassName('');
                let i = 0;
                interval = window.setInterval(() => {
                    setDisplayText(
                        text.split('').map((char, index) => {
                            if (index < i) return char;
                            if (char === ' ') return ' ';
                            return DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];
                        }).join('')
                    );
                    i += 1 / 3; // Sensitivity tweak
                    if (i > text.length) clearInterval(interval);
                }, speed);
            }
        };

        startTimeout = setTimeout(startAnimation, delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            clearTimeout(startTimeout);
        };
    }, [text, mode, trigger, delay, speed]);

    return { text: displayText, className, replay };
};
