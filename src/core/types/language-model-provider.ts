import type { TObject } from '@sinclair/typebox'

import type { Context } from './context'

import type { Options } from '@/core'

export interface LanguageModelProvider<
	T extends TObject,
	K extends TObject,
	Request,
	ProviderOptions,
	Response,
> {
	configureRequest: (
		context: Context<T, K>,
		options: Options & ProviderOptions,
	) => Request

	sendRequest: (
		request: Request,
		options: Options & ProviderOptions,
	) => Promise<Response>

	extractUpdatedData: (response: Response) => K
}
