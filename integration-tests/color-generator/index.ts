import { type Static, Type } from '@sinclair/typebox'

import { aiUpdate } from '@/main'
import { OpenAIProvider } from '@/providers'

const context =
	'You are a color generator. Given the description of a color you respond with a name, a hex value, and a description.'

const Color = Type.Object({
	name: Type.String({ description: 'A creative name for the color.' }),
	hex: Type.String({
		description:
			'A six-digit hexadecimal value for the color including the `#` prefix.',
	}),
	description: Type.String({
		description: 'A vivid, poetic description of the color.',
	}),
})

const prompt =
	'Imagine a color that is a mix of electric deep ocean blue and the aura of gold bullion.'

export type Color = Static<typeof Color>

export async function generateColor(): Promise<Color> {
	return await aiUpdate({
		provider: OpenAIProvider,
		content: {
			context,
			outputSchema: Color,
			userPrompts: [prompt],
		},
		options: {
			enableDataHealing: false,
			maxHealingAttempts: 0,
			maxRetries: 2,
			model: 'gpt-3.5-turbo-1106',
			timeout: 10 * 1000, // 10 seconds
		},
	})
}
