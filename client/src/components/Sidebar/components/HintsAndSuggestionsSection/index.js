import React from 'react'
import HintCard from './Cards'
import style from './style.module.scss'
export default function HintsAndSuggestionsSection() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-1">
                <div className={style.orangeDot}></div>
                <div className={style.alerts}>{10} Hints</div>
            </div>
            <HintCard
                description={
                    'You should write more about the topic, add something, You should write more about the topic, add something'
                }
            />
        </div>
    )
}
