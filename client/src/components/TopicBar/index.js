import React from 'react'
import style from './style.module.scss'
import { ReactComponent as Avatar } from 'assets/icons/AI-Avatar.svg'

export default function index() {
    return (
        <div className="flex gap-2 items-center w-full">
            <Avatar className="w-9" />
            <div
                className={`font-semibold text-sm rounded-lg px-5 py-5 w-full ${style.shadow}`}
            >
                Housing and accommodation has become a major problem in many
                countries around the world.
            </div>
        </div>
    )
}
