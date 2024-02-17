import type { TObject } from '@sinclair/typebox'

import type { Content } from './content'

import type { Options } from '@/core'

export interface Provider<ProviderOptions, ProviderRequest, ProviderResponse> {
	configureRequest: (
		content: Content<TObject>,
		options: Options & ProviderOptions,
	) => ProviderRequest

	sendRequest: (
		request: ProviderRequest,
		options: Options & ProviderOptions,
	) => Promise<ProviderResponse>

	extractUpdatedData: (response: ProviderResponse) => unknown
}
