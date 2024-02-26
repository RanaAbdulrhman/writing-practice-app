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

const {
    extractSpellingMistakes,
    extractGrammarMistakes,
} = require('../../rapid-api')

// Allowed origins
const allowedOrigins = [
    'http://localhost:3005',
    'https://immersive-writing.vercel.app/',
]

function stripTextOutsideObjectBraces(text) {
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start !== -1 && end !== -1 && end > start) {
        return text.substring(start, end + 1)
    }
    text.replace(/\\n/g, ' ') // Remove new line chars
    return '' // Return an empty string if there are no valid braces
}

// Endpoint to receive the essay from the frontend
app.post('/api/submit-essay', (req, res) => {
    const origin = req.headers.origin
    console.log(origin)
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { topic, essay } = req.body
    console.log('req.body', req.body)
    // Send the essay to the ChatGPT API for analysis
    generateResponse(topic, essay)
        .then(function (response) {
            let objectGenerated = stripTextOutsideObjectBraces(response.content)
            res.write(objectGenerated)
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
    const { topic, essay } = req.body
    // Send the essay to the ChatGPT API for analysis
    generateSuggestions(topic, essay)
        .then(function (response) {
            let objectGenerated = stripTextOutsideObjectBraces(response.content)
            res.write(objectGenerated)
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

app.post('/api/extract-spelling-mistakes', (req, res) => {
    const origin = req.headers.origin
    console.log(origin)
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { essay } = req.body
    // Send the essay to the ChatGPT API for analysis
    extractSpellingMistakes(essay)
        .then(function (response) {
            res.write(response || 'not loaded')
            res.end()
            console.log(response)
        })
        .catch(function (error) {
            const errorMessage = error.error || 'An unexpected error occurred.'

            console.log('Failed!', error)
            res.status(500).send(errorMessage)
        })
})

app.post('/api/extract-grammar-mistakes', (req, res) => {
    const origin = req.headers.origin
    console.log(origin)
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header for allowed origins
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    const { essay } = req.body
    // Send the essay to the ChatGPT API for analysis
    extractGrammarMistakes(essay)
        .then(function (response) {
            res.write(response || 'not loaded')
            res.end()
            console.log(response)
        })
        .catch(function (error) {
            const errorMessage = error.error || 'An unexpected error occurred.'

            console.log('Failed!', error)
            res.status(500).send(errorMessage)
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
