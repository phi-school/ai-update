import type { Static, TObject } from '@sinclair/typebox'

export type Context<T extends TObject, K extends TObject> = {
	currentData: Static<T>
	CurrentDataSchema: T
	ExpectedOutputSchema: K
	userPrompts: string[]
}
