import React from 'react'
import CorrectionCard from './Cards'
import style from './style.module.scss'
export default function SpellingMistakesSection() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-1">
                <div className={style.redDot}></div>
                <div className={style.alerts}>{3} Alerts</div>
            </div>
            <CorrectionCard wordBefore={'tow'} wordAfter={'two'} />
            <CorrectionCard wordBefore={'tow'} wordAfter={'two'} />
            <CorrectionCard wordBefore={'tow'} wordAfter={'two'} />
        </div>
    )
}
