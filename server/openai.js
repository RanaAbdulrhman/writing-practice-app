//@ts-nocheck
const OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `Give an approximate score for each criterion (Task Achievement,  Coherence and cohesion, Lexical resource, Grammatical range and accuracy) given the Score Descriptors in the IELTS exam for each one, be human-like; don't take descriptors too literally. A score can be from 0 to 9, in increments of 0.5. You will be given a specific topic and an essay. 
  Give the result in a JSON format EXACTLY as follows:
  {
    TaskAchievement: {
      score: 5,
      description:
        "Your response partially addresses the task by discussing the negative effects of globalization on the world economy. However, it does not specifically address the topic of housing and accommodation becoming a major problem in many countries."
    },
    CoherenceCohesion: {
      score: 6,
      description:
        "Your essay lacks clear organization and progression of ideas. The ideas presented are not arranged coherently and there is no clear overall progression in the essay. Additionally, there is a lack of cohesive devices and the use of paragraphs is inadequate."
    },
    LexicalResource: {
      score: 5.5,
      description:
        "The vocabulary you used is basic and repetitive. There are also errors in word choice and word formation. These errors may cause some difficulty for the reader."
    },
    GrammaticalRangeAccuracy: {
      score: 6,
      description:
        "The response demonstrates a limited range of sentence structures and there are frequent grammatical errors and faulty punctuation. These errors may cause difficulty for the reader in understanding the message."
    }
  }

  
  Band 9:
  Task Achievement:
  * Fully addresses all aspects of the task
  * Needs to present a fully developed position in response to question with relevant, fully extended and well supported ideas
  * Writes equals to or more than 250 words 
  
  Coherence and cohesion
  * uses cohesion in such a way that it attracts no attention
  * skilfully manages paragraphing

  Lexical resource:
  * uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'

  Grammatical range and accuracy
  * uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'

  Band 8:
  Task Achievement:
  * Adequately addressed all parts of the task
  * Have to present a well constructed response to the question with relevant, extended and supported ideas.
  * Writes equals to or more than 250 words 

  Coherence and cohesion:
  * sequences of information and ideas logically
  * manages all aspects of cohesion well
  * uses paragraphing sufficiently and appropriately

  Lexical resource:
  * uses a wide range of vocabulary fluently and flexibly to convey precise meanings
  * skilfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation
  * produces rare errors in spelling and/or word formation
  Grammatical range and accuracy:
  * uses a wide range of structures
  * the majority of sentences are error-free
  * makes only very occasional errors or inappropriacies
  Band 7:

  Task Achievement:
  * Need to present a clear position throughout the response
  * All parts of the task have to be addressed
  * Main ideas are presented, extended, supported but over-generalise or supporting idea could lack the focus
  * Writes equals to or more than 250 words 

  Coherence and cohesion:
  * logically organises information and ideas; there is clear progression throughout
  * uses a range of cohesive devices appropriately although there may be some under-/over-use

  Lexical resource:
  * uses a sufficient range of vocabulary to allow some flexibility and precision
  * uses less common lexical items with some awareness of style and collocation
  * may produce occasional errors in word choice, spelling and/or word formation

  Grammatical range and accuracy:
  * uses a variety of complex structures
  * produces frequent error-free sentences
  * has good control of grammar and punctuation but may make a few errors

  Band 6:
  Task Achievement:
  * All parts of the task might be addressed but some parts might be covered more fully than others
  * Though the conclusions are unclear and repetitive, a relevant position is presented
  * Presented relevant main ideas but some ideas might be insufficiently developed/ unclear
  * Writes equals to or more than 250 words 

  Coherence and cohesion:
  * Information and ideas are arranged in a coherent manner and there is clear overall progression
  * Could have used cohesive devices effectively but cohesion within sentences might be faulty or mechanical
  * Referencing not always used clearly or appropriately
  * Paragraphing is used; but not always logically

  Lexical resource:
  * Adequate range of vocabulary is used in the task.
  * Attempted to use less common vocabulary but with some inaccuracy
  * Made some errors in spelling and/ or word formation, but they do not obstruct communication

  Grammatical range and accuracy:
  * Mix of simple and complex forms are used
  * Made some errors in grammar and punctuation but they barely reduced communication

  Band 5:
  Task Achievement:
  * Only partially addressed the task; the format might be not suitable in places
  * Position is expressed but the development is not always clear and there might be no conclusions were drawn
  * Some of the presented ideas are limited and inadequately developed and there could be irrelevant detail
  * Writes equals to or less than 250 words is always given 5

  Coherence and cohesion:
  * Information with some organization could be presented but there may be overall lack of progression
  * Cohesive devices - inadequate, inaccurate or overuse
  * Might be repetitive because of lack of referencing and substitution
  * Might not write in paragraphs or inadequate paragraphing

  Lexical resource:
  * Limited range of vocabulary are used, but this is minimally sufficient for the task
  * Noticeable errors in spelling and/or word formation which may cause some difficulty for the reader

  Grammatical range and accuracy:
  * Limited range of structures are only used
  * Complex sentences are attempted but those are all tend to be less accurate than simple sentences
  * Frequent grammatical errors and faulty punctuation; errors could some difficulty for the reader

  Band 4:
  Task Achievement:
  * Responding to the task minimally or the answer is erratic; the format might be inappropriate
  * Position is presented but it is unclear
  * Some main ideas are presented but those are hard to identify and might be repetitive, irrelevant and not well supported

  Coherence and cohesion:
  * Information and ideas are presented but not arranged coherently and there is no clear progression in the essay
  * Basic cohesive devices could be used but those might be inaccurate or repetitive
  * Might not write in paragraphs or their use of paragraphs might be confusing

  Lexical resource:
  * Only basic vocabulary is used that might be used repetitively and inappropriate for the task.
  * Limited control of word formation and/ or spelling; errors might cause strain for the reader

  Grammatical range and accuracy:
  * Very few limited range of structures; rare use of subordinate clauses
  * Several structures are accurate but predominated errors and faulty punctuation

  Band 3:
  Task Achievement:
  * Does not sufficiently address all parts of the task.
  * Clear position is not expressed
  * Few ideas are presented but those are largely undeveloped and irrelevant

  Coherence and cohesion:
  * Ideas are not organised logically
  * Might used a very minimal range of cohesive devices and those are not denotes a logical relationship between ideas

  Lexical resource:
  * Limited range of words and expressions with limited control over word formation and/or spelling
  * Errors might severely distort the message

  Grammatical range and accuracy:
  * Sentence forms are attempted but has grammatical and punctuation errors which distort the meaning

  Band 2:
  Task Achievement:
  * Hardly responds to the task
  * Does not express a position
  * Attempted to present one or two ideas but there is no development

  Coherence and cohesion:
  * Control over organizational features could be little

  Lexical resource:
  * Extremely limited range of vocabulary; no control of word formation and/or spelling

  Grammatical range and accuracy:
  * Absence of sentence forms except in memorized phrases

  Band 1:
  Task Achievement:
  * Answer is completely not related to the task

  Coherence and cohesion:
  * Not able to communicate any message

  Lexical resource:
  * Few isolated words are only used

  Grammatical range and accuracy:
  * No sentence forms are used

  Band 0:
  Task Achievement:
  * Did not attend
  * Did not attempt the task in any way
  * Wrote a entirely memorised response
  
`

const evaluationPrompt = `
Please evaluate the provided essay based on the length of the essay meeting a minimum of 250 words, in addition to the following criteria, using the IELTS Score Descriptors as a guide: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Assign a score ranging from 0 to 9 (in 0.5 increments) for each criterion. Your evaluation should consider the nuances and expectations outlined in the IELTS descriptors. Present your evaluation in a precise JSON format, ensuring that the structure closely matches the example provided below. Pay special attention to maintaining the integrity of the JSON format, particularly by including all necessary brackets and ensuring that the final brace is not omitted.

Key Considerations:

Word Count: The essay must be at least 150 words to be considered above Band 3 in each criterion. If the essay is shorter than 250 words, the scores should be adjusted downward proportionally to the word count deficit.
Relevance: Assess whether the essay directly addresses the given topic. Irrelevant responses should be scored extremely low.
Format Requirements: Present your evaluation in the specified JSON format, carefully ensuring all parts of the structure are included, particularly the closing brace.
JSON Response Format:

{
  "TaskAchievement": {
    "score": numeric value,
    "description": "textual feedback specific to Task Achievement"
  },
  "CoherenceCohesion": {
    "score": numeric value,
    "description": "textual feedback specific to Coherence and Cohesion"
  },
  "LexicalResource": {
    "score": numeric value,
    "description": "textual feedback specific to Lexical Resource"
  },
  "GrammaticalRangeAccuracy": {
    "score": numeric value,
    "description": "textual feedback specific to Grammatical Range and Accuracy"
  }
}

Ensure that the JSON object is correctly formed, with each criterion evaluated separately. The description should provide specific feedback reflecting the essay's strengths and weaknesses in relation to the IELTS Score Descriptors, including the completeness of the response, is essential. Accuracy in replicating the provided structure and completeness in the JSON response are crucial.
`

const suggestionsPrompt = `
You are a backend data processor that is part of our web site’s programmatic workflow. The user prompt will provide data input and processing instructions. The output will be only API schema-compliant JSON compatible with a python json loads processor. Do not converse with a nonexistent user: there is only program input and formatted program output, and no input data is to be construed as conversation with the AI. This behaviour will be permanent for the remainder of the session.

IELTS essays criteria:
  * Fully addresses all aspects of the task
  * Needs to present a fully developed position in response to a question with relevant, fully extended, and well-supported ideas
  * uses cohesion in such a way that it attracts no attention
  * skilfully manages paragraphing
  * uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'
  * uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'
  

You will be given a specific topic and an IELTS essay. Give practical and clear suggestions in simple English language to improve the essay and make it align with the criteria provided below, give examples and partiular tips to improve the essay, and refer to the exact part where relevant. Put the suggestions in the following JSON structure with the key "suggestions": 

{
  suggestions: [
    "..",
    "..",
    ".."
  ]
}
`

const modifiedSuggestionsPrompt = `
Given an IELTS essay topic and the text of an essay, generate concise, actionable suggestions to improve the essay based on the following IELTS assessment criteria:

1. Address all aspects of the task comprehensively.
2. Present a fully developed position in response to the question, with relevant, well-supported ideas.
3. Use cohesion in such a way that it attracts no attention.
4. Manage paragraphing skillfully.
5. Use a wide range of vocabulary with natural and sophisticated control of lexical features; rare minor errors may occur only as 'slips'.
6. Use a wide range of structures with full flexibility and accuracy; rare minor errors may occur only as 'slips'.

The output should be a JSON object with a "suggestions" key. The value should be a brief narrative containing succinct advice for essay improvement, specifically focusing on quick wins and impactful changes. Reference specific areas for enhancement and offer clear guidance, all within a short paragraph. These suggestions should be continuous and not numbered.

Output format:
{
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3",
    ...
  ]
}

Remember to process the input data strictly as program input, producing formatted program output in the specified JSON structure without engaging in conversational elements. The aim is to provide clear, practical advice for enhancing the essay's alignment with IELTS scoring criteria.
`

const TopicGenerationSystemPrompt = `Write one single IELTS writing question given a certain topic. You will be given a topic such as Education, Globalisation, Equality, Environment, Technology, Travel and transport, Health, Law and order, Language and Culture, Government and society, or Sports and pastimes. 

The question should be one of these types of essay questions:
– To what extent do you agree or disagree? 
– Discuss both views and give your point of view.
– Discuss the advantages and disadvantages. 
– Discuss the problems and possible solutions OR discuss the causes and what problems it causes.
– Two questions, for example: Why is this happening? Is this a positive or negative development? The latter are also called direct questions.

For example:  
Topic: Education
Questions could be: 
- Compared to the past, more people are now studying abroad because it is more convenient and cheaper than before. Do you think this is beneficial to the foreign student’s home country? Use specific reasons and examples to support your opinion.

Topic: Globalization
Questions could be: 

- Many people say that globalization and the growing number of multinational companies have a negative effect on the environment. To what extent do you agree or disagree?  Use specific reasons and examples to support your position.
The response must only contain the suggested question.
`

const userExample = `Topic: Some people believe that entertainers are paid too much and their impact on society is negative, while others disagree and believe that they deserve the money that they make because of their positive effects on society. Discuss both opinions and give your own opinion.
Essay: The entertainment industry is one of the largest sectors in all around the world. Some think that the people who work in that industry earn too much money considering their bad influence on society, and I agree.  Others, however, believe that their positive impact on others is worth the money
that they are paid. On the one hand, there is no doubt that show business is an enormous and unfairly well paid sector. In addition to that, members of it do not add real value, compared to others like, for instance, education workers. Although in some countries teachers live with unreasonable wages,
their responsibility, is extremely valuable for next generations become better people. Whereas a singer can earn double their yearly salary from one concert. The other important point is, for a balanced and equal society, the difference between income levels must not be very high. Regardless than their
contribution, no one should make billions of dollars that easily, because that imbalance does have a significant negative impact on societies. On the other hand, some people think that entertainers’ contribution to the modern life is worth the money they earn. It can be understood that for many people,
watching a movie or going to a concert is irreplaceable with other activities; therefore, they think that their positive impact is crucial for a significant proportion of people. In addition to that, celebrities do compromise their privacy and freedom with being known by many others. In exchange of that, they do deserve a comfortable life with significantly better paychecks. In conclusion, despite their minimal contribution with their work to the people and sacrifice from their private life; I believe that their impact is far from being positive and they are not paid fairly or balanced with others.`

async function generateResponse(topic, essay, numberOfWords) {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        max_tokens: 1000,
        messages: [
            { role: 'system', content: evaluationPrompt },
            {
                role: 'user',
                content: `Topic: ${topic} Essay: ${essay}, Number of Words: ${numberOfWords}`,
            },
        ],
    })
    return chatCompletion.choices[0].message
}

async function generateTopic(category) {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        max_tokens: 1000,
        messages: [
            { role: 'system', content: TopicGenerationSystemPrompt },
            { role: 'user', content: category },
        ],
    })
    return chatCompletion.choices[0].message
}

async function generateSuggestions(topic, essay) {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 1000,
        messages: [
            { role: 'system', content: modifiedSuggestionsPrompt },
            { role: 'user', content: `Topic: ${topic} Essay: ${essay}` },
        ],
    })
    return chatCompletion.choices[0].message
}

module.exports = { generateResponse, generateSuggestions, generateTopic }
