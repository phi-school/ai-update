import type { TSchema } from '@sinclair/typebox'

import type { Context } from './context'

import type { AiUpdateOptions } from '@/core'

export interface LanguageModelProvider<
	T extends TSchema,
	K extends TSchema,
	Request,
	Options,
	Response,
> {
	configureRequest: (
		context: Context<T, K>,
		options: AiUpdateOptions & Options,
	) => Request

	sendRequest: (
		request: Request,
		options: AiUpdateOptions & Options,
	) => Promise<Response>

	extractUpdatedData: (response: Response) => K
}
