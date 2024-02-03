import React from 'react'
import style from './style.module.scss'
import { ReactComponent as EmptyMistakes } from 'assets/icons/emptyMistakes.svg'

export default function EmptyState({ icon = <EmptyMistakes />, title, desc }) {
    return (
        <div className="flex flex-col gap-5 justify-center items-center relative top-20 px-3">
            <div>{icon}</div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className={style.title}>{title}</div>
                <div className={style.desc}>{desc}</div>
            </div>
        </div>
    )
}
