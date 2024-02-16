import type { TObject } from '@sinclair/typebox'

export type Content<OutputSchema extends TObject, Context = unknown> = {
	context: Context
	outputSchema: OutputSchema
	userPrompts?: string[]
}
