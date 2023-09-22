import React from 'react'
import style from './style.module.scss'
import { ReactComponent as LightBulb } from 'assets/icons/lightBulb.svg'
export default function HintCard({ description }) {
    return (
        <div className={`${style.correctionCard} flex p-6`}>
            <div className="flex justify-between w-full">
                <div className="flex items-start justify-start gap-3">
                    <div className="flex flex-col  gap-3">
                        <div className="flex items-start justify-start gap-3">
                            <div className={style.iconContainer}>
                                <LightBulb />
                            </div>
                            <div className={style.description}>
                                {description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
