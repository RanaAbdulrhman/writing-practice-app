import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as Avatar } from 'assets/icons/PersonAvatar.svg'

export default function Index() {
    const [wordCount, setWordCount] = useState(0)

    let textChangeHandler = (e) => {
        countWords(e.target.value)
    }

    function countWords(str) {
        let c = 0
        let str1 = str.split(' ')

        for (let i = 0; i < str1.length; i++) {
            if (str1.length === 0) {
                setWordCount(0)
            }
            if (str1[i] !== '') {
                c++
            }
            setWordCount(c)
        }
    }

    return (
        <div className="flex flex-col gap-2 items-start content-start w-full">
            <div className={`${style.wordCount} ms-12`}>{wordCount} words</div>
            <div className="flex gap-2 items-start content-start w-full">
                <Avatar className="w-9" />
                <div className="w-full flex flex-col justify-around gap-4">
                    <textarea
                        color="gray"
                        rows={25}
                        placeholder="Start writing ..."
                        labelProps={{
                            className: 'before:content-none after:content-none',
                        }}
                        containerProps={{
                            className: 'grid h-full',
                        }}
                        spellcheck="false"
                        onChange={textChangeHandler}
                        data-gramm="false"
                        ata-gramm_editor="false"
                        data-enable-grammarly="false"
                        className={`font-semibold text-sm rounded-lg start-0 p-4 ${style.border}`}
                    ></textarea>
                    <div className="flex items-center justify-end w-full">
                        <button
                            className={`flex gap-2 items-center w-full sm:w-full xl:w-[223px] ${style.button}`}
                        >
                            Evaluate My Writing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
