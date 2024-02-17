import { type TObject } from '@sinclair/typebox'

import type { Provider, Options, Content } from './types'

import { aiUpdate } from '@/main'

export function createAiUpdateInstance<
	ProviderOptions extends object,
	ProviderRequest extends object,
	ProviderResponse extends object,
>(
	provider: Provider<ProviderOptions, ProviderRequest, ProviderResponse>,
	options?: Partial<Options & ProviderOptions>,
) {
	return async function configuredAiUpdate<
		OutputSchema extends TObject,
		Context,
	>(content: Content<OutputSchema, Context>) {
		return aiUpdate({
			provider,
			content,
			options,
		})
	}
}
