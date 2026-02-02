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
                        <span className="anim-reveal" style={{ animationDelay: '0.1s' }}>Crafting Digital</span><br />
                        <span className="anim-reveal" style={{ animationDelay: '0.2s' }}>Experiences with</span><br />
                        <span className="text-highlight anim-reveal" style={{ animationDelay: '0.3s' }}>Engineering Precision</span>
                    </h1>

                    <p className="hero-description anim-fade" style={{ animationDelay: '0.5s' }}>
                        Transforming complex problems into elegant, functional, and visually stunning solutions.
                        Blending technical mastery with artistic vision.
                    </p>

                    <div className="hero-actions anim-fade" style={{ animationDelay: '0.7s' }}>
                        <a
                            href="mailto:yigitsezerx@gmail.com"
                            className="btn btn-secondary"
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
