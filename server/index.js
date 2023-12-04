const express = require('express')
require('dotenv').config()
var cors = require('cors')
const PORT = process.env.PORT || 3004
const app = express()
app.use(cors())
app.use(express.json())

const {
    generateResponse,
    generateTopic,
    generateSuggestions,
} = require('./openai')

function parseApiResponse(apiResponse) {
    const jsonFormattedResponse = JSON.parse(apiResponse)
    console.log(jsonFormattedResponse)

    const keyMappings = {
        TaskAchievement: 'TaskAchievement',
        CoherenceCohesion: 'CoherenceCohesion',
        LexicalResource: 'LexicalResource',
        GrammaticalRangeAccuracy: 'GrammaticalRangeAccuracy',
    }

    const formattedResult = {}

    for (const [key, formattedKey] of Object.entries(keyMappings)) {
        const item = apiResponse[key]
        if (item) {
            formattedResult[formattedKey] = {
                score: item.score,
                description: item.description,
            }
        }
    }

    return formattedResult
}

// Endpoint to receive the essay from the frontend
app.post('/submit-essay', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3005')
    const { essay } = req.body
    // Send the essay to the ChatGPT API for analysis
    generateResponse(essay)
        .then(function (response) {
            res.write(response.content)
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            res.write(response.error)
            res.end()
            console.log('Failed!', error)
        })
})

app.post('/generate-suggestions', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3005')
    const { essay } = req.body
    // Send the essay to the ChatGPT API for analysis
    generateSuggestions(essay)
        .then(function (response) {
            res.write(response.content)
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            res.write(error.error)
            res.end()
            console.log('Failed!', error)
        })
})

// Endpoint to receive the essay from the frontend
app.post('/generate-topic', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3005')
    const { topic } = req.body
    // Send the essay to the ChatGPT API for analysis
    generateTopic(topic)
        .then(function (response) {
            res.write(response.content || 'not loaded')
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            res.write(error)
            res.end()
            console.log('Failed!', error)
        })
})

// generateTopic('technology')
//     .then(function (response) {
//         console.log(response.content)
//     })
//     .catch(function (error) {
//         console.log('Failed!', error)
//     })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
