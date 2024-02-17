import { createAiUpdateInstance } from '@/core'
import { OpenAIProvider } from '@/providers'

export const aiUpdateWithOpenAI = createAiUpdateInstance(OpenAIProvider, {
	enableDataHealing: true,
	maxHealingAttempts: 0,
	maxRetries: 2,
	model: 'gpt-3.5-turbo-0125',
	timeout: 10 * 1000,
})
