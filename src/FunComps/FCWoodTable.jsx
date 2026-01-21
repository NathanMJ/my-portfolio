import React, { useEffect, useState } from 'react'
import { useTranslation } from '../contexts/LanguageContext'

export default function FCWoodTable() {
    const { t } = useTranslation()

    const [indexSwitch, setIndexSwitch] = useState(0)
    const [toolSelected, setToolSelected] = useState(-1)

    // Determine current mode
    const isBrowseMode = toolSelected === -1
    const isToolMode = toolSelected !== -1

    // Reset tool selection when changing section
    useEffect(() => {
        setToolSelected(-1)
    }, [indexSwitch])

    const currentYear = new Date().getFullYear();

    const switchContainer = [
        { title: t('woodTable.sections.off') },
        {
            title: t('woodTable.sections.frontend'),
            tools: [
                {
                    name: t('woodTable.tools.htmlCssJs'), group: ["html", "css", "js"], duration: currentYear - 2022,
                    projects: [
                        { name: t('woodTable.projectsList.battleship') },
                        { name: t('woodTable.projectsList.shop4animals') },
                        { name: t('woodTable.projectsList.chessHelp') }
                    ]
                },
                {
                    name: t('woodTable.tools.visualAssets'), group: ["photoshop", "infinite-painter", "blender"], duration: currentYear - 2015,
                    projects: [
                        { name: t('woodTable.projectsList.focalya') },
                        { name: t('woodTable.projectsList.kmoovan') },
                        { name: t('woodTable.projectsList.eretzkids') },
                        { name: t('woodTable.projectsList.eretzkidsAssets') }
                    ]
                },
                {
                    name: t('woodTable.tools.react'), img: 'react', duration: currentYear - 2015,
                    projects: [
                        { name: t('woodTable.projectsList.dinnerWebsite') },
                        { name: t('woodTable.projectsList.chessHelp2025') },
                        { name: t('woodTable.projectsList.dinnerApp') }
                    ]
                },
                {
                    name: t('woodTable.tools.davinciResolve'), img: 'davinci-resolve', duration: currentYear - 2020,
                    projects: [
                        { name: t('woodTable.projectsList.youtubeEditing') }
                    ]
                },
                {
                    name: t('woodTable.tools.flStudio'), img: 'fl-studio', duration: currentYear - 2020,
                    projects: [
                        { name: t('woodTable.projectsList.youtubeRemix') },
                        { name: t('woodTable.projectsList.videoGames') },
                    ]
                }
            ]
        },
        {
            title: t('woodTable.sections.backend'),
            tools: [
                {
                    name: t('woodTable.tools.python'), img: 'python', duration: currentYear - 2023,
                    projects: [
                        { name: t('woodTable.projectsList.fightList') },
                        { name: t('woodTable.projectsList.licensePlate') },
                    ]
                },
                {
                    name: t('woodTable.tools.csharp'), img: 'c-sharp', duration: currentYear - 2020,
                    projects: [
                        { name: t('woodTable.projectsList.pentamino') },
                        { name: t('woodTable.projectsList.dinnerAppServer') }
                    ]
                },
                {
                    name: t('woodTable.tools.nodeJs'), img: 'node-js', duration: currentYear - 2022,
                    projects: [
                        { name: t('woodTable.projectsList.dinnerWebsiteServer') },
                    ]
                },
                {
                    name: t('woodTable.tools.java'), img: 'java', duration: currentYear - 2024,
                    projects: [
                        { name: t('woodTable.projectsList.snakeApp') },
                        { name: t('woodTable.projectsList.memoryApp') },
                    ]
                },
                {
                    name: t('woodTable.tools.mongodb'), img: 'mongodb', duration: currentYear - 2022,
                    projects: [
                        { name: t('woodTable.projectsList.dinnerWebsiteDb') },
                    ]
                },
                {
                    name: t('woodTable.tools.sql'), img: 'sql', duration: currentYear - 2022,
                    projects: [
                        { name: t('woodTable.projectsList.dinnerAppDb') },
                    ]
                }
            ],
        }
    ];

    // Get current section tools
    const currentSection = switchContainer[indexSwitch]
    const currentTools = currentSection?.tools || []
    const selectedTool = isToolMode ? currentTools[toolSelected] : null

    // Handler functions
    const handleToolClick = (toolIndex) => {
        if (toolSelected !== toolIndex) {
            setToolSelected(toolIndex)
        } else {
            setToolSelected(-1)
        }
    }

    const handleBackToTools = () => {
        setToolSelected(-1)
    }

    // ========================================
    // RENDER: BROWSE MODE (Navigation entre les outils)
    // ========================================
    const renderBrowseMode = () => (
        <div className="tools browse-mode">
            {currentTools.map((tool, index) => (
                <div
                    className="tool holo-enter"
                    key={tool.name}
                    onClick={() => handleToolClick(index)}
                >
                    {tool.group && tool.group.length > 0 ? (
                        <div className="group-img-container">
                            {tool.group.map((img, i) => (
                                <img key={i} src={`/logo/${img}-logo.webp`} alt={img} />
                            ))}
                        </div>
                    ) : (
                        <img src={`/logo/${tool.img || tool.name}-logo.webp`} alt={tool.name} />
                    )}
                </div>
            ))}
        </div>
    )

    // ========================================
    // RENDER: TOOL MODE (Outil sélectionné)
    // ========================================
    const renderToolMode = () => {
        if (!selectedTool) return null

        return (
            <div className="tools tool-mode">
                <div className="tool selected holo-enter" onClick={handleBackToTools}>
                    {/* Tool Icon */}
                    {selectedTool.group && selectedTool.group.length > 0 ? (
                        <div className="group-img-container">
                            {selectedTool.group.map((img, i) => (
                                <img key={i} src={`/logo/${img}-logo.webp`} alt={img} />
                            ))}
                        </div>
                    ) : (
                        <img src={`/logo/${selectedTool.img || selectedTool.name}-logo.webp`} alt={selectedTool.name} />
                    )}

                    {/* Tool Info */}
                    <p className='name'>{selectedTool.name}</p>
                    <p className='duration'>{selectedTool.duration} {t('woodTable.ui.yearsExperience')}</p>

                    {/* Projects Container */}
                    <div className='projects-container'>
                        <h1>{t('woodTable.ui.projects')}</h1>
                        <div className='projects'>
                            {selectedTool.projects?.map((project, index) => (
                                <div className="project" key={index}>
                                    <p>{project.name}</p>
                                    {project.duration && <p>{project.duration}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ========================================
    // MAIN RENDER
    // ========================================
    return (
        <section className="wood-table">
            <div className="container">
                <div className="inner">
                    {/* Header carved image */}
                    <img src="./objects/my-skills-carved.webp" alt="my-skills" className='carved' />

                    {/* Switch selector */}
                    <div className='switch-container'>
                        <img className='switch' src="./objects/switch.webp" alt="switch" />
                        <div className='text-container'>
                            <div className='text-inner'
                                style={{
                                    transform: `translateX(-${indexSwitch}00%)`,
                                    color: indexSwitch === 0 ? 'rgba(203, 55, 55, 1)' : 'rgb(101, 200, 209)',
                                    filter: indexSwitch === 0
                                        ? 'drop-shadow(0px 0px 10px rgba(248, 118, 101, 1))'
                                        : 'drop-shadow(0px 0px 10px rgb(125, 231, 213))'
                                }}>
                                {switchContainer.map((section, index) => (
                                    <h1 key={index}>{section.title}</h1>
                                ))}
                            </div>
                        </div>
                        <div className='arrows-container'>
                            <img
                                className={`left-arrow ${indexSwitch === 0 ? 'disabled' : ''}`}
                                src="./objects/switch-left-arrow.webp"
                                alt="left-arrow"
                            />
                            <div
                                className='left-arrow-clickable'
                                onClick={() => indexSwitch > 0 && setIndexSwitch(prev => prev - 1)}
                            />
                            <img
                                className={`right-arrow ${indexSwitch === switchContainer.length - 1 ? 'disabled' : ''}`}
                                src="./objects/switch-right-arrow.webp"
                                alt="right-arrow"
                            />
                            <div
                                className='right-arrow-clickable'
                                onClick={() => indexSwitch < switchContainer.length - 1 && setIndexSwitch(prev => prev + 1)}
                            />
                        </div>
                    </div>

                    {/* Tools Container - Conditional Rendering */}
                    <div className={`tools-container ${indexSwitch !== 0 ? "holo-enter" : 'holo-exit'}`}>
                        {indexSwitch !== 0 && (
                            isBrowseMode ? renderBrowseMode() : renderToolMode()
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
