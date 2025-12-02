import { useEffect, useMemo, useRef, useState } from 'react'
import FCTimer from './FuncComps/FCTimer'
import FCInfiniteLogos from './FuncComps/FCInfiniteLogos';

function App() {

  // "homepage": "https://nathanmj.github.io/porfolio-react/",

  const projects = [
    {
      title: 'Chess help',
      desc: 'An interactive chess analysis application that uses color-coded lines to visually explain the tactical situation, material attacks, and king safety on the board.',
      img: 'chess-help.png'
    }, {
      title: 'Pentamino solver',
      desc: 'Dive into the fascinating world of pentominoes! Solve complex puzzles and explore all possible solutions with this intuitive app.'
      , img: 'pentamino-solver.png'
    }, {
      title: 'Shell game',
      desc: 'A simple game, find the right shell and won 5 000$'
      , img: 'shell-game.png'
    }, {
      title: 'Best AI ever',
      desc: 'No comments needed.'
      , img: 'best-ai.png'
    }
  ]

  const leftLogos = [
    { img: 'html-css-js-logo.png', years: 2020 },
    { img: 'react-logo.png', years: 2020 },
    { img: 'c-sharp-logo.png', years: 2020 },
    { img: 'java-logo.png', years: 2022 },
    { img: 'python-logo.png', years: 2022 },
    { img: 'node-js-logo.png', years: 2020 },
    { img: 'sql-logo.png', years: 2020 },
    { img: 'mongodb-logo.png', years: 2020 },
  ]

  const rightLogos = [
    { img: 'blender-logo.png', years: 2019 },
    { img: 'procreate-logo.png', years: 2022 },
    { img: 'procreate-dreams-logo.png', years: 2022 },
    { img: 'davinci-resolve-logo.png', years: 2020 },
    { img: 'photoshop-logo.png', years: 2012 },
    { img: 'lightroom-logo.png', years: 2014 },
    { img: 'premiere-pro-logo.png', years: 2018 },
    { img: 'premiere-pro-logo.png', years: 2018 },
  ]

  const elementRef = useRef(null);
  const [centeredX, setCenteredX] = useState(0);
  const [topCenter, setTopCenter] = useState('center')

  const [snoozeStatus, setSnoozeStatus] = useState(false)


  const avaiblesFace = [
    { img: 'normal-face-icon.png', name: '' },
    { img: 'batman-icon.png', name: 'Batman' },
    { img: 'spiderman-icon.png', name: 'Spider-man' },
  ]

  const [iAmTxt, setIAmTxt] = useState('Nathan')
  const [maskFace, setMaskFace] = useState('')


  const getMask = () => {
    console.log(maskFace);
    switch (maskFace) {
      case 'Batman':
        return <div className='mask'>
          <img src='Man masks/batman.png' alt="batman-mask" className='from-top' />
        </div>
      case 'Spider-man':
        return <div className='mask'>
          <img src='Man masks/spiderman.png' alt="spiderman-mask" className='from-top' />
        </div>
    }
  }

  useEffect(() => {
    switch (topCenter) {
      case 'left':
        setIAmTxt(`a ${maskFace} developer`)
        break
      case 'center':
        if (maskFace) {
          setIAmTxt(maskFace)
        }
        else {
          setIAmTxt('Nathan')
        }
        break
      case 'right':
        setIAmTxt(`a ${maskFace} designer`)
        break
    }
  }, [topCenter, maskFace])


  const [showBottomPortfolio, setShowBottomPortfolio] = useState(false)

  const hoverTheTopCenter = (event) => {
    // S'assurer que la référence est bien attachée
    if (!elementRef.current) return;
    setTopCenter('center')

    // Récupérer les dimensions et la position de l'élément
    const rect = elementRef.current.getBoundingClientRect();

    // Position X de la souris par rapport au viewport
    const rawClientX = event.clientX;

    // Milieu de l'élément : (Position du bord gauche + (Largeur / 2))
    const elementCenter = rect.left + (rect.width / 2);

    // Position centrée relative à l'élément
    // Si la souris est au centre, X_element = X_raw - X_center = 0
    const newCenteredX = rawClientX - elementCenter;

    setCenteredX(newCenteredX);
  };

  useEffect(() => {
    if (snoozeStatus) {
      //when the snooze button is visible
      setShowBottomPortfolio(true)
    }
    else {
      //after click on snooze
      //scroll toward the top
      setShowBottomPortfolio(false)
    }
  }, [snoozeStatus])

  function headerFooter(c) {
    return <div className={c}>
      <div className='links'>
        <a href="https://www.linkedin.com/in/nathan-mimoun-210527348/" target='_blank'>
          <img src="linkedin-logo.png" alt="linkedin-logo" />
        </a>
        <a href="https://github.com/NathanMJ" target='_blank' >
          <img src="github-logo.png" alt="github-logo" />
        </a>
      </div>
      <div className='middle'>
        <p>About me</p>
        <p>Portfolio</p>
        <p>Contact me</p>
      </div>
      <div className='langages'>
        <img src="france.png" alt="france-flag" />
        <img src="israel.png" alt="israel-flag" />
        <img src="uk.webp" alt="uk-flag" />
      </div>
    </div>
  }

  return (
    <div className='portfolio-page'>
      <div className='top-portfolio-page'>
        {headerFooter('header')}
        <div className='main'>
          <div className='center-page'>
            <div className='top-center-page' >

              <div className={`zones`} >
                <div className={`left-zone ${topCenter == 'left' ? 'show' : 'hide'}`} onMouseOver={() => setTopCenter('left')}>
                  <FCInfiniteLogos logos={leftLogos} times={2} />
                </div>
                <div className='center-zone' onMouseMove={hoverTheTopCenter}></div>
                <div className={`right-zone ${topCenter == 'right' ? 'show' : 'hide'}`} onMouseOver={() => setTopCenter('right')}>
                  <FCInfiniteLogos logos={rightLogos} times={2} />
                </div>
              </div>
              <div className={`arrows-container direction-${topCenter}`}>
                <img src="thin-arrow.png" alt="thin-arrow" className={`left`} />
                <img src="thin-arrow.png" alt="thin-arrow" className={`right`} style={{ scale: '-100%' }} />

              </div>
              <div className="man-container" ref={elementRef} style={{ transition: `translate ease-in-out ${topCenter != 'center' ? '0.35s' : ''}`, translate: topCenter != 'center' ? (topCenter == 'left' ? `200px` : '-200px') : centeredX / -4 }}>
                <img src="man.png" alt="man" className='man' />
                <div className='mask-container'>
                  <div className='mask'>
                    {maskFace && <img key={maskFace} src={`Man masks/${maskFace.toLowerCase()}.png`} alt={maskFace.toLowerCase()} className={`from-top ${maskFace}`} />}
                  </div>
                </div>
                <div className='wooden-pannel-container'>
                  <div className='text'>
                    <h1>I am</h1>
                    <h2>{iAmTxt}</h2>
                  </div>
                  <img src="wooden-pannel.png" alt="man" className='wooden-pannel' />
                </div>
              </div>

            </div>
            <div className="bottom-center-page">
              <div className='face-styles'>
                {avaiblesFace.map((f, index) => {
                  return <img key={index} src={f.img} alt={f.img} className='icon' onClick={() => setMaskFace(f.name)} />
                })}
              </div>
              <div className='title'>
                <div className='black-line'></div>
                <h1>My lonely projects</h1>
                <div className='black-line'></div>
              </div>
              <div className='projects'>
                {projects.map((p, index) => {
                  return <div className='project-container' key={index}>
                    <div className="top"><img src={p.img} alt="img" /></div>
                    <div className="bottom">
                      <h1>{p.title}</h1>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                })}
              </div>
              <div className='timer-container'>
                <FCTimer setSnoozeStatus={setSnoozeStatus} ></FCTimer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-portfolio-page' style={{ display: showBottomPortfolio ? 'flex' : 'none' }}>

        <div className='my-history'>
          {[{
            img: 'foetus.jpg',
            date: '03/08/2001',
            txt: `Je suis un ne le 3 aout a Paris (France), le nom de la sage femme 
          etait Francine Dupont, dans la salle il faisait exactement 25 degres. La couverture qui m'a enveloppe 
          etait de couleur bleu (plus exactement rgb(164, 192, 200) ). Mais je crois que cette partie de ma vie n'est pas exactement 
          ce que vous cherchez, allons un peu plus loin dans le temps.` },
          {
            date: '25/09/2006',
            img: 'photo-de-classe.png',
            txt: `Je rentre a l'ecole Ozar Hatorah Creteil ou je vais passer le restant de ma scolarite : Primaire, College et Lycee. La bas je passe mon bac
              avec specialisation en Mathematique.` },
          {
            date: '25/09/2020',
            img: 'bar-ilan.webp',
            txt: `Ensuite pendant un an j'ai fait la prepa a Bar Ilan pour ameliorer mon hebreu et mon anglais.`
          },
          {
            date: '25/08/2021',
            img: 'tsahal.jpg',
            txt: `Suite a cela je m'engage dans l'armee dans la cryptage de communications.`
          },
          {
            date: '19/09/2023',
            img: 'ruppin.jpg',
            txt: `Apres mon armee, je suis alle a Ruppin pour faire mes etudes en ingenieur informatique, 
              en tant que software ingenieur specialisation en fullstack. Diplome avec une moyenne de 97 et une note a ma presentation de projet de fin d'annees de 100 ainsi que des felicitations.` },
          {
            date: 'Today',
            img: 'cant.png',
            txt: `Aujourd'hui je suis motive plus que jamais a trouver un travail dans une boite en informatique pour pouvoir developper
               mes competences en informatique et pouvoir accomplir de grands projets tel que les votres pourquoi pas ?`
          }
          ].map((c, index) => {
            const even = index % 2 == 0 ? 'even' : 'odd'
            return <div className='case-container' key={index}>

              <div className='border-container'>
                <div className='border'>
                  <div className='up-line'></div>
                  {even == 'even' &&
                    <div className='center'>
                      <div className='circle'></div>
                      <p>{c.date}</p>
                    </div>
                  }
                  <div className='bottom-line'></div>
                </div>
              </div>


              <div className={`case ${even}`} >
                <img src={`/history/${c.img}`} alt={c.img} />
                <p>{c.txt}</p>
              </div>

              <div className='border-container'>
                <div className='border'>
                  <div className='up-line'></div>
                  {even == 'odd' &&
                    <div className='center'>
                      <div className='circle'></div>
                      <p>{c.date}</p>
                    </div>
                  }
                  <div className='bottom-line'></div>
                </div>
              </div>


            </div>
          })}
        </div>

        <div className='bottom-page'>
            <div className="transition"></div>
        </div>
        {headerFooter('footer')}

      </div>
    </div >
  )
}

export default App
