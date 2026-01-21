import React, { useRef, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const BASE_URL = import.meta.env.BASE_URL

export default function FCLab() {
  const { t } = useTranslation();

  const panelsData = [
    {
      title: t('lab.projects.chessHelp.title'),
      imgSrc: `${BASE_URL}my-lab/chess-help.webp`,
      description: t('lab.projects.chessHelp.description')
    },
    {
      title: t('lab.projects.pentamino.title'),
      imgSrc: `${BASE_URL}my-lab/pentamino-solver.webp`,
      description: t('lab.projects.pentamino.description')
    },
    {
      title: t('lab.projects.pokeRuppin.title'),
      imgSrc: `${BASE_URL}my-lab/poke-ruppin.webp`,
      description: t('lab.projects.pokeRuppin.description')
    }
  ];

  const spinnerRef = useRef(null);
  const stageRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const panelWrapperRefs = useRef([]);
  let currentAngleRef = useRef(0);

  // Calcul automatique de l'angle entre les panneaux
  const angleIncrement = 360 / panelsData.length;
  const radius = 380; // Correspond à --radius en CSS

  useEffect(() => {
    const spinner = spinnerRef.current;
    const stage = stageRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!spinner || !stage || !prevBtn || !nextBtn) return;

    // Mettre à jour la variable CSS --theta avec l'angle calculé
    stage.style.setProperty('--theta', `${angleIncrement}deg`);

    // Fonction pour calculer et appliquer le blur basé sur la position z
    function updatePanelBlur() {
      panelWrapperRefs.current.forEach((wrapper, index) => {
        if (!wrapper) return;

        // Calculer l'angle actuel du panneau (en radians)
        const panelAngle = ((index * angleIncrement) + currentAngleRef.current) * (Math.PI / 180);

        // Calculer la position z (plus proche de 0 = devant, plus négatif = derrière)
        const zPosition = radius * Math.cos(panelAngle);

        // Calculer le blur : plus le panneau est derrière (z négatif), plus il est flou
        // Normaliser entre 0 (devant) et 8px (derrière)
        const maxBlur = 8;
        const normalizedZ = (zPosition + radius) / (2 * radius); // Normaliser entre 0 et 1
        const blurAmount = (1 - normalizedZ) * maxBlur;

        // Appliquer le blur au panneau
        const panel = wrapper.querySelector('.panel');
        if (panel) {
          panel.style.filter = `blur(${blurAmount}px)`;
        }
      });
    }

    function rotateCarousel(direction) {
      if (direction === 'next') {
        currentAngleRef.current -= angleIncrement;
      } else {
        currentAngleRef.current += angleIncrement;
      }
      spinner.style.transform = `rotateY(${currentAngleRef.current}deg)`;

      // Mettre à jour le blur pendant la transition (0.8s)
      const startTime = Date.now();
      const duration = 800; // Durée de la transition en ms

      function animateBlur() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        updatePanelBlur();

        if (progress < 1) {
          requestAnimationFrame(animateBlur);
        }
      }

      requestAnimationFrame(animateBlur);
    }

    const handleNext = () => rotateCarousel('next');
    const handlePrev = () => rotateCarousel('prev');
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') rotateCarousel('next');
      if (e.key === 'ArrowLeft') rotateCarousel('prev');
    };

    // Gestionnaire de clic sur les panneaux
    const panelClickHandlers = [];

    function createPanelClickHandler(index) {
      return function (e) {
        const stageRect = stage.getBoundingClientRect();
        const stageCenterX = stageRect.left + stageRect.width / 2;
        const clickX = e.clientX;

        // Si le clic est à droite du centre, tourner à droite (next)
        // Si le clic est à gauche du centre, tourner à gauche (prev)
        if (clickX > stageCenterX) {
          rotateCarousel('next');
        } else {
          rotateCarousel('prev');
        }
      };
    }

    // Ajouter les event listeners sur les panneaux
    panelWrapperRefs.current.forEach((wrapper, index) => {
      if (wrapper) {
        const panel = wrapper.querySelector('.panel');
        if (panel) {
          const handler = createPanelClickHandler(index);
          panelClickHandlers.push({ panel, handler });
          panel.addEventListener('click', handler);
        }
      }
    });

    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
    document.addEventListener('keydown', handleKeyDown);

    // Set initial transform
    spinner.style.transform = `rotateY(${currentAngleRef.current}deg)`;

    // Initialiser le blur au chargement
    setTimeout(() => updatePanelBlur(), 100);

    return () => {
      // Nettoyer les event listeners des panneaux
      panelClickHandlers.forEach(({ panel, handler }) => {
        panel.removeEventListener('click', handler);
      });

      nextBtn.removeEventListener('click', handleNext);
      prevBtn.removeEventListener('click', handlePrev);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [angleIncrement, radius]);

  return (
    <section className="my-lab">
      <div className="stage" ref={stageRef}>
        <div className="middle-pipe-container">
          <div className="rings-container">
            <img className="ring" src={`${BASE_URL}objects/ring-pipe.webp`} alt="" />
            <img className="ring" src={`${BASE_URL}objects/ring-pipe.webp`} alt="" />
            <img className="ring" src={`${BASE_URL}objects/ring-pipe.webp`} alt="" />
          </div>
          <div className="pipe"></div>
        </div>

        <div className="spinner" id="spinner" ref={spinnerRef}>
          {panelsData.map((panel, index) => (
            <div
              key={index}
              className="panel-wrapper"
              style={{ "--i": index }}
              ref={(el) => panelWrapperRefs.current[index] = el}
            >
              <div className="panel">
                <div className="panel-header">{panel.title}</div>
                <div className="panel-image-container">
                  {panel.imgSrc ? (
                    <img
                      src={panel.imgSrc}
                      alt={panel.title}
                      className="panel-image"
                    />
                  ) : (
                    <div className="panel-image-placeholder">Img {index + 1}</div>
                  )}
                </div>
                <div className="panel-footer">{panel.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button className="btn-holo" id="prevBtn" ref={prevBtnRef}>
          &lt;
        </button>
        <button className="btn-holo" id="nextBtn" ref={nextBtnRef}>
          &gt;
        </button>
      </div>
    </section>
  );
}
