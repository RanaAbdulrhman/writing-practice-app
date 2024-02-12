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
} = require('../../openai')

// function parseApiResponse(apiResponse) {
//     const jsonFormattedResponse = JSON.parse(apiResponse)
//     console.log(jsonFormattedResponse)

//     const keyMappings = {
//         TaskAchievement: 'TaskAchievement',
//         CoherenceCohesion: 'CoherenceCohesion',
//         LexicalResource: 'LexicalResource',
//         GrammaticalRangeAccuracy: 'GrammaticalRangeAccuracy',
//     }

//     const formattedResult = {}

//     for (const [key, formattedKey] of Object.entries(keyMappings)) {
//         const item = apiResponse[key]
//         if (item) {
//             formattedResult[formattedKey] = {
//                 score: item.score,
//                 description: item.description,
//             }
//         }
//     }

//     return formattedResult
// }

// Allowed origins
const allowedOrigins = [
    'http://localhost:3005',
    'https://api-writing-practice-app.vercel.app',
]

// Endpoint to receive the essay from the frontend
app.post('/api/submit-essay', (req, res) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { essay } = req.body
    console.log('req.body', req.body)
    // Send the essay to the ChatGPT API for analysis
    generateResponse(essay)
        .then(function (response) {
            res.write(response.content)
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            // Check if the error has a specific property indicating a user-friendly message
            const errorMessage = error.error || 'An unexpected error occurred.'

            // Send an appropriate HTTP status code and the error message
            res.status(500).send(errorMessage)
        })
})

app.post('/api/generate-suggestions', (req, res) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { essay } = req.body
    console.log('req.body', req.body)
    // Send the essay to the ChatGPT API for analysis
    generateSuggestions(essay)
        .then(function (response) {
            res.write(response.content)
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            // Check if the error has a specific property indicating a user-friendly message
            const errorMessage = error.error || 'An unexpected error occurred.'

            // Send an appropriate HTTP status code and the error message
            res.status(500).send(errorMessage)
        })
})

// Endpoint to receive the essay from the frontend
app.post('/api/generate-topic', (req, res) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { category } = req.body
    // Send the essay to the ChatGPT API for analysis
    generateTopic(category)
        .then(function (response) {
            res.write(response.content || 'not loaded')
            res.end()
            console.log(response.content)
        })
        .catch(function (error) {
            const errorMessage = error.error || 'An unexpected error occurred.'

            console.log('Failed!', error)
            res.status(500).send(errorMessage)
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
