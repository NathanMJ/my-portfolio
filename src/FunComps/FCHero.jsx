import { useEffect, useRef } from "react";
import { useTranslation } from "../contexts/LanguageContext";

const BASE_URL = import.meta.env.BASE_URL

function FCHero() {
    const { t } = useTranslation();
    const innerRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const innerElement = innerRef.current;
        const heroElement = heroRef.current;

        if (!innerElement || !heroElement) return;

        const handleMouseMove = (e) => {
            const rect = innerElement.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            innerElement.style.setProperty('--mouse-x', `${x}px`);
            innerElement.style.setProperty('--mouse-y', `${y}px`);
        };

        heroElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            heroElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    return (

        <section className="hero" ref={heroRef}>
            <div className="hero-text">
                <div className="inner" ref={innerRef}>
                    <h1 className="title">{t('hero.title')}</h1>
                    <h2 className="subtitle">
                        {t('hero.subtitle')}
                    </h2>
                </div>
            </div>

            <div className="hero-visual">
                <div className="img-container">
                    <img src={`${BASE_URL}hero/nathan.webp`} alt="Nathan" className="profile-img" />
                </div>
            </div>
        </section>
    );
}

export default FCHero;