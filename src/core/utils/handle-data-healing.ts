import type { TObject } from '@sinclair/typebox'
import type { ValueError } from '@sinclair/typebox/value'

import type { Options, LanguageModelProvider, Context } from '@/core'
import { aiUpdate } from '@/main'

export async function handleDataHealing<
	T extends TObject,
	K extends TObject,
	Request extends object,
	ProviderOptions extends object,
	Response extends object,
>(
	errors: ValueError[],
	provider: LanguageModelProvider<T, K, Request, ProviderOptions, Response>,
	context: Context<T, K>,
	options: Options & ProviderOptions,
) {
	throw new Error('Data healing is not yet implemented.')

	// TODO
	// Modify the provider config based on the errors
	// For instance, appending error information to the user prompt
	// or changing the system content in some way.
	// const { userPrompt } = context

	// Recursively call aiUpdate with the modified configuration
	return aiUpdate({
		provider,
		context,
		options,
	})
}
