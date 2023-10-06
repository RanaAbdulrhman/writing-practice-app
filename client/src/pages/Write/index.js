import React, { useState, useEffect } from 'react'
import TopicBar from 'components/TopicBar'
import WritingSpace from 'components/WritingSpace'
import Sidebar from 'components/Sidebar'
import axios from 'axios'
export default function Index() {
    const [isEvaluate, setIsEvaluate] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [spellingMistakesList, setSpellingMistakesList] = useState(null)
    const [grammerMistakesList, setGrammerMistakesList] = useState(null)
    const [scores, setScores] = useState(null)
    const [essay, setEssay] = useState('')

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
        if (activeTab === 1) {
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
        } else if (activeTab === 2) {
            extractGrammerMistakes()
                .then((data) => {
                    const grammerMistakes = data?.response?.errors.filter(
                        (item) => item.type === 'grammar'
                    )
                    setGrammerMistakesList(grammerMistakes)
                    console.log('grammer', grammerMistakes)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [activeTab])

    useEffect(() => {
        if (essay !== '') {
            loadScores(essay)
                .then((data) => {
                    setScores(data)
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
        <div className="flex flex-col items-center justify-center w-full min-h-full flex-grow-1">
            <div className="flex justify-between gap-12 w-full xl:flex-nowrap sm:flex-wrap min-h-screen">
                <div className="flex flex-col items-center relative top-14 gap-12 px-8 xl:w-3/4 sm:w-full ">
                    <TopicBar />
                    <WritingSpace
                        disabled={isEvaluate}
                        isEvaluate={isEvaluate}
                        handleEvaluateBtnClick={handleEvaluateBtnClick}
                        spellingMistakesList={spellingMistakesList}
                        grammerMistakesList={grammerMistakesList}
                        activeTab={activeTab}
                    />
                </div>
                {isEvaluate &&
                    (scores ? (
                        <div className="xl:w-1/4 sm:w-full min-h-screen">
                            <Sidebar
                                scores={scores}
                                spellingMistakesList={spellingMistakesList}
                                grammerMistakesList={grammerMistakesList}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>
                    ) : (
                        <div className="xl:w-1/4 sm:w-full min-h-screen">
                            {/* Render a loading message or placeholder here */}
                            <p>Loading...</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
