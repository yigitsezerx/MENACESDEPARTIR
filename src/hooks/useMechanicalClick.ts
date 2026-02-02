import { useRef, useEffect, useCallback } from 'react';

export const useMechanicalClick = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction if possible, or lazily
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContextClass();
        } catch (e) {
            console.error('Web Audio API not supported', e);
        }

        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const playClick = useCallback(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const t = ctx.currentTime;

        // 1. Digital "Glass" Ping (Sine Wave)
        // Pure tone, quick decay. Fits "Liquid Glass" aesthetic.
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.1, t); // Quiet
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);

        // 2. High-Tech "Click" (Short High-Pass Noise)
        // Adds clarity and 'snap' without being 'crunchy'
        const bufferSize = ctx.sampleRate * 0.01; // 10ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000; // Very high sizzle

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);
    }, []);

    const playHover = useCallback(() => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const t = ctx.currentTime;

        // Subtle "Glitch" Chirp (Randomized Frequency)
        // Very futuristic, like data streaming
        const osc = ctx.createOscillator();
        osc.type = 'square';
        const freq = 2000 + Math.random() * 500;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq - 500, t + 0.02);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.005, t); // Extremely quiet
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

        // Filter to remove harshness
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 3000;

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.03);
    }, []);

    return { playClick, playHover };
};
