import React, { useEffect, useState } from 'react'
import CorrectionCard from './Cards'
import style from './style.module.scss'
import axios from 'axios'

export default function SpellingMistakesSection({ spellingMistakesList }) {
    const CorrectionCardsList =
        spellingMistakesList &&
        spellingMistakesList.map((item, index) => (
            <CorrectionCard
                key={index}
                wordBefore={item?.bad}
                wordAfter={item?.better?.[0]}
            />
        ))

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-1">
                <div className={style.redDot}></div>
                <div className={style.alerts}>
                    {spellingMistakesList && spellingMistakesList?.length}{' '}
                    Alerts
                </div>
            </div>
            {CorrectionCardsList}
        </div>
    )
}
