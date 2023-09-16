import React from 'react'
import style from './style.module.scss'

export default function index() {
    return (
        <button
            className={`flex gap-2 items-center md:w-full xl:w-[223px] ${style.button}`}
        >
            Evaluate My Writing
        </button>
    )
}
