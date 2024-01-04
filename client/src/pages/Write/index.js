import React, { useState, useEffect } from 'react'
import TopicBar from 'components/TopicBar'
import WritingSpace from 'components/WritingSpace'
import Sidebar from 'components/Sidebar'
import axios from 'axios'
import Timer from './components/Timer'
import RestartButton from './components/RestartButton'
import TopicModal from 'pages/Main/components/TopicModal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactAppzi from 'react-appzi'

export default function Index() {
    ReactAppzi.initialize(process.env.REACT_APP_APPZI_TOKIN)
    const [topic, setTopic] = useState(null)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isEvaluate, setIsEvaluate] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [spellingMistakesList, setSpellingMistakesList] = useState(null)
    const [grammerMistakesList, setGrammerMistakesList] = useState(null)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [scores, setScores] = useState()
    const [essay, setEssay] = useState('')
    const [isTextareaActive, setIsTextareaActive] = useState(false)

    // The width below which the mobile view should be rendered
    const breakpoint = 1420

    useEffect(() => {
        window.addEventListener('resize', () =>
            setScreenWidth(window.innerWidth)
        )
    }, [])

    async function loadScores(essay) {
        // setLoading(true)
        try {
            const res = await axios.post('http://localhost:3004/submit-essay', {
                essay: essay,
            })
            const data = await res.data
            return data
        } catch (err) {
            console.log(err)
        }
        // setLoading(false)
    }

    async function loadSuggestions(essay) {
        // setLoading(true)
        try {
            const res = await axios.post(
                'http://localhost:3004/generate-suggestions',
                {
                    essay: essay,
                }
            )
            const data = await res.data
            return data
        } catch (err) {
            console.log(err)
        }
        // setLoading(false)
    }

    const encodedParams = new URLSearchParams()

    async function extractSpellingMistakes() {
        encodedParams.set('text', essay)

        const options = {
            method: 'POST',
            url: 'https://textgears-textgears-v1.p.rapidapi.com/spelling',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key':
                    '9efb866723msh01ca208a4f65476p1de087jsn08d7f81c48f2',
                'X-RapidAPI-Host': 'textgears-textgears-v1.p.rapidapi.com',
            },
            data: encodedParams,
        }

        try {
            const response = await axios.request(options)
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    async function extractGrammerMistakes() {
        encodedParams.set('text', essay)

        const options = {
            method: 'POST',
            url: 'https://textgears-textgears-v1.p.rapidapi.com/grammar',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key':
                    '9efb866723msh01ca208a4f65476p1de087jsn08d7f81c48f2',
                'X-RapidAPI-Host': 'textgears-textgears-v1.p.rapidapi.com',
            },
            data: encodedParams,
        }

        try {
            const response = await axios.request(options)
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        extractSpellingMistakes()
            .then((data) => {
                const spellingMistakes = data?.response?.errors.filter(
                    (item) => item.type === 'spelling'
                )
                setSpellingMistakesList(spellingMistakes)
            })
            .catch((err) => {
                console.log(err)
            })
        extractGrammerMistakes()
            .then((data) => {
                const grammerMistakes = data?.response?.errors.filter(
                    (item) => item.type === 'grammar'
                )
                setGrammerMistakesList(grammerMistakes)
            })
            .catch((err) => {
                console.log(err)
            })
        if (essay !== '') {
            loadScores(essay)
                .then((data) => {
                    setScores(data)
                })
                .catch((err) => {
                    console.log(err)
                })
            loadSuggestions(essay)
                .then((data) => {
                    setSuggestionsList(data?.suggestions)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [essay])

    const handleEvaluateBtnClick = (essay) => {
        setEssay(essay)
        setIsEvaluate(true)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full flex-grow-1 p-10">
            <div
                className={`flex justify-between ${
                    screenWidth < breakpoint ? 'flex-col' : ''
                } w-full`}
            >
                <div
                    className={`flex flex-col items-center   ${
                        isEvaluate && screenWidth > breakpoint
                            ? 'relative w-full top-14 gap-5 px-8 xl:w-8/12 sm:w-full'
                            : 'w-full'
                    }`}
                >
                    <div className="flex w-full justify-end mb-2">
                        <Timer isActive={isTextareaActive} />
                        <RestartButton />
                    </div>

                    <TopicBar topic={localStorage.getItem('topic')} />
                    <WritingSpace
                        disabled={isEvaluate}
                        isEvaluate={isEvaluate}
                        handleEvaluateBtnClick={handleEvaluateBtnClick}
                        spellingMistakesList={spellingMistakesList}
                        grammerMistakesList={grammerMistakesList}
                        activeTab={activeTab}
                        isTextareaActive={isTextareaActive}
                        setIsTextareaActive={setIsTextareaActive}
                    />
                </div>

                {isEvaluate && (
                    <div
                        className={`${
                            screenWidth > breakpoint ? 'xl:w-1/4' : 'w-full'
                        } `}
                    >
                        <Sidebar
                            scores={scores}
                            spellingMistakesList={spellingMistakesList}
                            grammerMistakesList={grammerMistakesList}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            suggestionsList={suggestionsList}
                        />
                    </div>
                )}
            </div>
            {!localStorage.getItem('topic') && (
                <TopicModal setTopic={setTopic} />
            )}

            {/* {console.log(localStorage.getItem('topic'))} */}
        </div>
    )
}
