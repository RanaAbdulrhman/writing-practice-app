import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as Avatar } from 'assets/icons/PersonAvatar.svg'

export default function Index({
    isEvaluate,
    disabled = false,
    handleEvaluateBtnClick,
    spellingMistakesList,
    grammerMistakesList,
    activeTab,
}) {
    const [wordCount, setWordCount] = useState(0)
    const [text, setText] = useState('')

    let textChangeHandler = (e) => {
        countWords(e.target.value)
        setText(e.target.value)
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

    const WordMistakesHighlighter = ({ text, mistakes, mistakeType }) => {
        let result = []
        let lastIndex = 0

        for (const mistake of mistakes) {
            const { offset, length } = mistake
            const beforeMistake = text.substring(lastIndex, offset)
            const mistakeText = text.substring(offset, offset + length)

            result.push(
                <span key={lastIndex}>{beforeMistake}</span>,
                <span
                    key={offset}
                    style={{
                        color: mistakeType === 'spelling' ? 'red' : '#FFAE2C',
                    }}
                    className={
                        mistakeType === 'spelling'
                            ? style.spellingHighlightedWord
                            : style.grammerHighlightedWord
                    }
                >
                    {mistakeText}
                </span>
            )

            lastIndex = offset + length
        }

        // Add the remaining text after the last mistake
        if (lastIndex < text.length) {
            result.push(
                <span key={lastIndex}>{text.substring(lastIndex)}</span>
            )
        }

        return <div>{result}</div>
    }

    return (
        <div className="flex flex-col gap-2 items-start content-start w-full">
            <div className={`${style.wordCount} ms-12`}>{wordCount} words</div>
            <div className="flex gap-2 items-start content-start w-full">
                <Avatar className="w-9" />
                <div className="w-full flex flex-col justify-around gap-4">
                    {isEvaluate ? (
                        <div
                            className={`font-semibold text-sm rounded-lg start-0 p-4 ${style.border}`}
                        >
                            {activeTab === 1
                                ? spellingMistakesList && (
                                      <WordMistakesHighlighter
                                          text={text}
                                          mistakes={spellingMistakesList}
                                          mistakeType="spelling"
                                      />
                                  )
                                : activeTab === 2
                                ? grammerMistakesList && (
                                      <WordMistakesHighlighter
                                          text={text}
                                          mistakes={grammerMistakesList}
                                          mistakeType="grammar"
                                      />
                                  )
                                : text}
                        </div>
                    ) : (
                        <textarea
                            color="gray"
                            rows={25}
                            placeholder="Start writing ..."
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                            containerProps={{
                                className: 'grid h-full',
                            }}
                            value={text}
                            spellcheck="false"
                            onChange={textChangeHandler}
                            disabled={disabled}
                            data-gramm="false"
                            ata-gramm_editor="false"
                            data-enable-grammarly="false"
                            className={`font-semibold text-sm rounded-lg start-0 p-4 ${style.border}`}
                        ></textarea>
                    )}

                    <div className="flex items-center justify-end w-full">
                        <button
                            className={`flex gap-2 items-center w-full sm:w-full xl:w-[223px] ${style.button}`}
                            onClick={() => handleEvaluateBtnClick(text)}
                        >
                            Evaluate My Writing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
