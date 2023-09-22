import React from 'react'
import style from './style.module.scss'
import { ReactComponent as RightArrow } from 'assets/icons/rightArrow.svg'

export default function CorrectionCard({ wordBefore, wordAfter }) {
    return (
        <div className={`${style.correctionCard} flex p-6`}>
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className={style.redDot}></div>
                    <div className={style.wordBefore}>{wordBefore}</div>
                    <div>
                        <RightArrow />
                    </div>
                    <div className={style.wordAfter}>{wordAfter}</div>
                </div>
            </div>
        </div>
    )
}
