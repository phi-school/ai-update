import { type Static, Type } from '@sinclair/typebox'

import { aiUpdateWithOpenAI } from './openai-instance'

const context =
	'You are a color generator. Given the description of a color you respond with a name, a hex value, and a description.'

const Color = Type.Object({
	name: Type.String({ description: 'A creative name for the color.' }),
	hex: Type.String({
		description:
			'A six-digit hexadecimal value for the color including the `#` prefix.',
	}),
	description: Type.String({
		description: 'A succinct poetic description of the color.',
	}),
})

export type Color = Static<typeof Color>

export async function generateColor(prompt: string): Promise<Color> {
	return await aiUpdateWithOpenAI({
		context,
		outputSchema: Color,
		userPrompts: [prompt],
	})
}
