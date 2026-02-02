import './Hero.css';
import AsciiVisual from './AsciiVisual';
import HUD from './HUD';
import { useMechanicalClick } from '../hooks/useMechanicalClick';
import { useCellularGlitch } from '../hooks/useCellularGlitch';

const Hero = () => {
    const { playClick, playHover } = useMechanicalClick();
    const { displayText: btnText, trigger: triggerGlitch } = useCellularGlitch({
        text: 'CONTACT ME',
        iterations: 15,
        speed: 40
    });

    const handleContactClick = () => {
        playClick();
        triggerGlitch();
        // Removed CSS glitch-active class to match "Cellular" purity
    };

    return (
        <section className="hero">
            <HUD />
            <div className="hero-split">
                {/* Left: Content */}
                <div className="hero-content">


                    <h1 className="hero-title">
                        <span className="anim-reveal" style={{ animationDelay: '0.1s' }}>Introducing</span><br />
                        <span className="text-highlight anim-reveal" style={{ animationDelay: '0.2s' }}>MENACESDEPARTIR,</span><br />
                        <span className="anim-reveal" style={{ animationDelay: '0.3s' }}>to you.</span>
                    </h1>

                    <p className="hero-description anim-fade" style={{ animationDelay: '0.5s' }}>
                        Bridging the void between raw data and human emotion.
                        Precision designing for a more civilized age.
                    </p>

                    <div className="hero-actions anim-fade" style={{ animationDelay: '0.7s' }}>
                        <a
                            href="mailto:yigitsezerx@gmail.com"
                            className="btn btn-ascii"
                            onClick={handleContactClick}
                            onMouseEnter={() => { playHover(); triggerGlitch(); }}
                        >
                            {btnText}
                        </a>
                    </div>


                </div>

                {/* Right: Visual */}
                <div className="hero-visual-container anim-fade" style={{ animationDelay: '0.9s' }}>
                    <AsciiVisual />
                    {/* Gradient removed for clarity */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
