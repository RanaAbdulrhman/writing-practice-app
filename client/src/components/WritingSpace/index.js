import React from 'react'
import style from './style.module.scss'
import { Textarea } from '@material-tailwind/react'
import { ReactComponent as Avatar } from 'assets/icons/PersonAvatar.svg'

export default function index() {
    return (
        <div className="flex gap-2 items-start content-start w-full">
            <Avatar className="w-9" />
            <div className="w-full flex flex-col justify-around gap-4">
                <Textarea
                    color="gray"
                    rows={25}
                    placeholder="Start writing ..."
                    labelProps={{
                        className: 'before:content-none after:content-none',
                    }}
                    containerProps={{
                        className: 'grid h-full',
                    }}
                    className={`font-semibold text-sm rounded-lg start-0 p-4 ${style.border}`}
                />
                <div className="flex items-center justify-end w-full">
                    <button
                        className={`flex gap-2 items-center w-full sm:w-full xl:w-[223px] ${style.button}`}
                    >
                        Evaluate My Writing
                    </button>
                </div>
            </div>
        </div>
    )
}
