import React from 'react'
import style from './style.module.scss'
import { ReactComponent as RestartICon } from 'assets/icons/restart.svg'
export default function index() {
    return (
        <button
            className={`flex gap-2 items-center w-[50px] ms-3 ${style.button}`}
        >
            <RestartICon />
        </button>
    )
}
