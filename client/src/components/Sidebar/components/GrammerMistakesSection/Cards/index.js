import React from 'react'
import style from './style.module.scss'

export default function CorrectionCard({ sentenceBefore, sentenceAfter }) {
    return (
        <div className={`${style.correctionCard} flex p-6`}>
            <div className="flex justify-between w-full">
                <div className="flex items-start justify-start gap-3">
                    <div className="flex flex-col  gap-3">
                        <div className="flex items-baseline justify-start gap-3">
                            <div className={style.dotContainer}>
                                <div className={style.orangeDot}></div>
                            </div>
                            <div className={style.wordBefore}>
                                {sentenceBefore}
                            </div>
                        </div>
                        <div className="flex items-start justify-start gap-3">
                            <div className={style.dotContainer}></div>
                            <div className={style.wordAfter}>
                                {sentenceAfter}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
