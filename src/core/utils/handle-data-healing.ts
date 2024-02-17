import type { TObject } from '@sinclair/typebox'
import type { ValueError } from '@sinclair/typebox/value'

import type { Options, Provider, Content } from '@/core'
import { aiUpdate } from '@/main'

export async function handleDataHealing<
	OutputSchema extends TObject,
	Context,
	ProviderOptions extends object,
	ProviderRequest extends object,
	ProviderResponse extends object,
>(
	errors: ValueError[],
	provider: Provider<ProviderOptions, ProviderRequest, ProviderResponse>,
	content: Content<OutputSchema, Context>,
	options: Options & ProviderOptions,
) {
	throw new Error('Data healing is not yet implemented.')

	// TODO
	// Modify the provider config based on the errors
	// For instance, appending error information to the user prompt
	// or changing the system content in some way.
	// const { userPrompt } = content

	// Recursively call aiUpdate with the modified configuration
	return aiUpdate({
		provider,
		content,
		options,
	})
}
