import type { Static, TSchema } from '@sinclair/typebox'

export type Context<T extends TSchema, K extends TSchema> = {
	currentData: Static<T>
	CurrentDataSchema: T
	ExpectedOutputSchema: K
	userPrompts: string[]
}
