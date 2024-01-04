import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TopicModal from './components/TopicModal'

export default function MainPage() {
    const [question, setQuestion] = useState()

    // useEffect(() => {
    //     generateTopic('Health')
    // }, [])

    return (
        <div>
            <TopicModal setTopic={setQuestion} /> {question && question}
        </div>
    )
}
