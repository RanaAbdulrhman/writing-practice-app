import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as OverallScoreIcon } from 'assets/icons/score.svg'
import { ReactComponent as GrammerMistakesIcon } from 'assets/icons/grammer.svg'
import { ReactComponent as SpellingMistakesIcon } from 'assets/icons/spelling.svg'
import { ReactComponent as HintsIcon } from 'assets/icons/hints.svg'

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {
            title: 'Overall Scores',
            icon: <OverallScoreIcon />,
            content: <div>o</div>,
        },
        {
            title: 'Spelling Mistakes',
            icon: <SpellingMistakesIcon style={{ marginBottom: '3px' }} />,
            content: <div>s</div>,
        },
        {
            title: 'Grammer Mistakes',
            icon: <GrammerMistakesIcon />,
            content: <div>g</div>,
        },
        {
            title: 'Hints & Suggestions',
            icon: <HintsIcon />,
            content: <div>h</div>,
        },
    ]

    const tabComponents = tabs.map((tab, index) => (
        <li
            key={index}
            className={`${style.sideItem} ${
                activeTab === index && style.active
            }`}
            onClick={() => setActiveTab(index)}
        >
            {tab.icon}
            <span className="w-9/12">{tab.title}</span>
        </li>
    ))

    return (
        <div
            className={`relative w-full h-full bg-white ${style.sidebarContainer} transition-transform -translate-x-full sm:translate-x-0 pt-12`}
        >
            <div>{tabs[activeTab].content}</div>
            <ul className="space-y-2 absolute top-1 -right-6 mt-12">
                {tabComponents}
            </ul>
        </div>
    )
}
