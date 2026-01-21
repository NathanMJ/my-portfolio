import { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';

function FCHeader() {
    const { language, setLanguage, currentLang } = useLanguage();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setIsLangMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode) => {
        setLanguage(langCode);
        setIsLangMenuOpen(false);
    };

    return (
        <header>
            <div className="header-container">
                <div className="my-links">
                    <img src="./logo/github-logo.png" alt="Logo" />
                    <img src="./logo/linkedin-logo.png" alt="Logo" />
                </div>

                <div className="language-selector" ref={langMenuRef}>
                    <button
                        className={`lang-toggle ${isLangMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        aria-label="Select language"
                    >
                        <span className="lang-flag">{currentLang.flag}</span>
                        <span className="lang-code">{currentLang.code.toUpperCase()}</span>
                        <span className="lang-arrow">▼</span>
                    </button>

                    <div className={`lang-dropdown ${isLangMenuOpen ? 'open' : ''}`}>
                        {Object.values(LANGUAGES).map((lang) => (
                            <button
                                key={lang.code}
                                className={`lang-option ${language === lang.code ? 'selected' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="lang-flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="laser-container">
                <div className="laser"></div>
                <div className="laser glow"></div>
            </div>
        </header>
    );
}

export default FCHeader;
