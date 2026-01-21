import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export const LANGUAGES = {
    en: { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    fr: { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    he: { code: 'he', name: 'עברית', flag: '🇮🇱', dir: 'rtl' }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Load from localStorage or default to English
        const saved = localStorage.getItem('preferred-language');
        return saved && LANGUAGES[saved] ? saved : 'en';
    });

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('preferred-language', language);

        // Update document language (keep LTR direction for all languages)
        document.documentElement.lang = language;
    }, [language]);

    // Translation function - supports nested keys like "hero.title"
    const t = useCallback((key, fallback = '') => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if key not found
                value = translations['en'];
                for (const k2 of keys) {
                    if (value && typeof value === 'object' && k2 in value) {
                        value = value[k2];
                    } else {
                        return fallback || key;
                    }
                }
                break;
            }
        }

        return typeof value === 'string' ? value : fallback || key;
    }, [language]);

    const value = {
        language,
        setLanguage,
        currentLang: LANGUAGES[language],
        languages: LANGUAGES,
        t // Translation function
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Alias for convenience
export const useTranslation = useLanguage;

export default LanguageContext;
