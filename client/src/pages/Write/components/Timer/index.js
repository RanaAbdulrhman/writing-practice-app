import React, { useEffect, useState } from 'react'
import style from './style.module.scss'

export default function Timer({
    seconds,
    minutes,
    hours,
    start,
    pause,
    isActive,
}) {
    const [isOverTime, setIsOverTime] = useState(false)
    const formatTime = (time) => {
        return String(time).padStart(2, '0')
    }
    useEffect(() => {
        if (isActive) {
            start()
        } else {
            pause()
        }
    }, [isActive])

    useEffect(() => {
        if (minutes > 40) {
            setIsOverTime(true)
        }
    }, [minutes])

    return (
        <div
            className={`flex items-center ${style.timer} ${
                isOverTime && style.overTime
            }`}
        >
            <div className={style.timerDigit}>{formatTime(hours)[0]}</div>
            <div className={style.timerDigit}>{formatTime(hours)[1]}</div>
            <div className={style.colon}>:</div>
            <div className={style.timerDigit}>{formatTime(minutes)[0]}</div>
            <div className={style.timerDigit}>{formatTime(minutes)[1]}</div>
            <div className={style.colon}>:</div>
            <div className={style.timerDigit}>{formatTime(seconds)[0]}</div>
            <div className={style.timerDigit}>{formatTime(seconds)[1]}</div>
        </div>
    )
}
