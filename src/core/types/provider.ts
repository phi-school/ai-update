import type { TObject } from '@sinclair/typebox'

import type { Content } from './content'

import type { Options } from '@/core'

export interface Provider<
	T extends TObject,
	K,
	ProviderOptions,
	ProviderRequest,
	ProviderResponse,
> {
	configureRequest: (
		content: Content<T, K>,
		options: Options & ProviderOptions,
	) => ProviderRequest

	sendRequest: (
		request: ProviderRequest,
		options: Options & ProviderOptions,
	) => Promise<ProviderResponse>

	extractUpdatedData: (response: ProviderResponse) => K
}
