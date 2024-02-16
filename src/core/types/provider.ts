import type { TObject } from '@sinclair/typebox'

import type { Content } from './content'

import type { Options } from '@/core'

export interface Provider<
	OutputSchema extends TObject,
	Context,
	ProviderOptions,
	ProviderRequest,
	ProviderResponse,
> {
	configureRequest: (
		content: Content<OutputSchema, Context>,
		options: Options & ProviderOptions,
	) => ProviderRequest

	sendRequest: (
		request: ProviderRequest,
		options: Options & ProviderOptions,
	) => Promise<ProviderResponse>

	extractUpdatedData: (response: ProviderResponse) => Context
}
