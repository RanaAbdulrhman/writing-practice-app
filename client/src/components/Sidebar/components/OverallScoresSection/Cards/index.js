import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as DropDownIcon } from 'assets/icons/dropDown.svg'

const OverallScoreCard = ({ score }) => {
    return (
        <div
            className={`${style.overallScore} flex flex-col justify-between p-6`}
        >
            <div className="flex justify-between w-full cursor-pointer">
                <div>
                    <div className="flex items-baseline">
                        <span className={style.score}>{score}</span>
                        <span className={style.ieltsBand}>IELTS Band</span>
                    </div>
                    <div className={style.title}>Overall Score</div>
                </div>
            </div>
        </div>
    )
}

const DetailedScoreCard = ({ typeIndex, score, description }) => {
    const [expanded, setExpanded] = useState(false)

    function toggleExpanded() {
        setExpanded(!expanded)
    }

    return (
        <div
            className={`${style.detailedScoreCard} flex flex-col justify-between cursor-pointer p-6`}
            style={{ borderColor: types[typeIndex].borderColor }}
            onClick={toggleExpanded}
        >
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                        <span className={style.score}>{score}</span>
                        <span className={style.ieltsBand}>IELTS Band</span>
                    </div>
                    <div className={style.title}>{types[typeIndex].title}</div>
                </div>
                <div className="flex items-end">
                    <DropDownIcon
                        className={`${style.dropDown} ${
                            expanded && style.reverseY
                        }`}
                    />
                </div>
            </div>
            {expanded && (
                <div className={`${style.expandablePart} mt-3`}>
                    {description}
                </div>
            )}
        </div>
    )
}

export { OverallScoreCard, DetailedScoreCard }

const types = [
    {
        title: 'Task Achievement',
        borderColor: '#15C39A',
    },
    {
        title: 'Logical Flow and Connection',
        borderColor: '#4A6EE0',
    },
    {
        title: 'Vocabulary and Spelling',
        borderColor: '#EA1537',
    },
    {
        title: 'Grammer and sentence structure',
        borderColor: '#FFC33C',
    },
]
