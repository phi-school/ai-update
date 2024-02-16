import type { TObject } from '@sinclair/typebox'

export type Content<T extends TObject, K = unknown> = {
	context: K
	outputSchema: T
	userPrompts?: string[]
}
