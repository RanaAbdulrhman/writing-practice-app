const axios = require('axios')

const encodedParams = new URLSearchParams()

async function extractSpellingMistakes(essay) {
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
        console.log(
            'response?.data?.response?.errors',
            response?.data?.response?.errors
        )
        return JSON.stringify(response?.data?.response?.errors)
    } catch (error) {
        console.error(error)
        return error
    }
}

async function extractGrammarMistakes(essay) {
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
        console.log(
            'response?.data?.response?.errors',
            response?.data?.response?.errors
        )
        return JSON.stringify(response?.data?.response?.errors)
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = { extractSpellingMistakes, extractGrammarMistakes }
