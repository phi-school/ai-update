import OpenAI from 'openai'
import { process } from 'std-env'

const openaiConfig = {
	apiKey: process.env['OPENAI_API_KEY'],
}

export const openaiClient = new OpenAI(openaiConfig)
