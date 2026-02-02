import { useState, useEffect } from 'react';
import './HUD.css';

const HUD = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hud-overlay">
            {/* Top Left: System Status */}
            <div className="hud-corner hud-tl">
                <span className="hud-indicator active"></span>
                <span className="hud-text">SYS.ONLINE</span>
            </div>

            {/* Top Right: Time */}
            <div className="hud-corner hud-tr">
                <span className="hud-text">{time}</span>
                <span className="hud-label">IST</span>
            </div>

            {/* Bottom Left: Coordinates/Location */}
            <div className="hud-corner hud-bl">
                <div className="hud-line-group">
                    <span className="hud-text">BASED IN ISTANBUL</span>
                    <span className="hud-label">OPERATIONAL: WORLDWIDE</span>
                </div>
            </div>

            {/* Bottom Right: Status/Signature */}
            <div className="hud-corner hud-br">
                <span className="hud-label">2026 &copy; MENACESDEPARTIR</span>
            </div>

            {/* Decorative Frame Lines (Distinct & Aligned) */}
            <div className="hud-line line-top"></div>
            <div className="hud-line line-bottom"></div>
            <div className="hud-line line-left"></div>
            <div className="hud-line line-right"></div>
        </div>
    );
};

export default HUD;
