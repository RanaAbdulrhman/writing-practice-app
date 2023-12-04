import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TopicModal from './components/TopicModal'

export default function MainPage() {
    const [question, setQuestion] = useState()

    // useEffect(() => {
    //     generateTopic('Health')
    // }, [])

    useEffect(() => {
        if (question) {
            console.log(question)
        }
    }, [question])

    return (
        <div>
            <TopicModal /> {question && question}
        </div>
    )
}
