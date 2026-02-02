import './Hero.css';
import AsciiVisual from './AsciiVisual';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-split">
                {/* Left: Content */}
                <div className="hero-content">


                    <h1 className="hero-title">
                        Crafting Digital<br />
                        Experiences with<br />
                        <span className="text-highlight">Engineering Precision</span>
                    </h1>

                    <p className="hero-description">
                        Transforming complex problems into elegant, functional, and visually stunning solutions.
                        Blending technical mastery with artistic vision.
                    </p>

                    <div className="hero-actions">
                        <button className="btn btn-primary">
                            VIEW PROJECTS <span className="btn-arrow">→</span>
                        </button>
                        <button className="btn btn-secondary">
                            CONTACT ME
                        </button>
                    </div>


                </div>

                {/* Right: Visual */}
                <div className="hero-visual-container">
                    <AsciiVisual />
                    {/* Gradient removed for clarity */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
