import React from 'react'
import CorrectionCard from './Cards'
import style from './style.module.scss'
export default function GrammerMistakesSection() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-1">
                <div className={style.orangeDot}></div>
                <div className={style.alerts}>{10} Alerts</div>
            </div>
            <CorrectionCard
                sentenceBefore={
                    'undeveloped countries where economy flourished'
                }
                sentenceAfter={
                    'undeveloped countries where economies have flourished.'
                }
            />
            <CorrectionCard
                sentenceBefore={
                    'undeveloped countries where economy flourished'
                }
                sentenceAfter={
                    'undeveloped countries where economies have flourished.'
                }
            />
            <CorrectionCard
                sentenceBefore={
                    'undeveloped countries where economy flourished'
                }
                sentenceAfter={
                    'undeveloped countries where economies have flourished.'
                }
            />
        </div>
    )
}
