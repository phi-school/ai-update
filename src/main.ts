import type { Static, TObject } from '@sinclair/typebox'
import { Check, Value } from '@sinclair/typebox/value'
import { merge } from 'ts-deepmerge'

import {
	handleDataHealing,
	type Options,
	type Provider,
	type Content,
} from '@/core'
import { SchemaValidationError } from '@/errors'
import {
	createObservable,
	UpdateState,
	type UpdateStateType,
} from '@/observables'

const defaultOptions: Options = {
	enableDataHealing: false,
	maxHealingAttempts: 0,
}

const updateState = createObservable<UpdateStateType>()
export const aiUpdateState = updateState

// TODO Better manage type exports and provider exports. Consider a single file
// for exported types and add it to the tsup config.
export { OpenAIProvider, type OpenAiOptions } from '@/providers'

export async function aiUpdate<
	OutputSchema extends TObject,
	Context,
	ProviderOptions extends object,
	ProviderRequest extends object,
	ProviderResponse extends object,
>({
	provider,
	content,
	options = {},
}: {
	provider: Provider<
		OutputSchema,
		Context,
		ProviderOptions,
		ProviderRequest,
		ProviderResponse
	>
	content: Content<OutputSchema, Context>
	options?: Partial<Options & ProviderOptions>
}): Promise<Static<OutputSchema>> {
	updateState.notify(UpdateState.Initializing)

	const mergedOptions = merge(defaultOptions, options) as Options &
		ProviderOptions

	const { enableDataHealing, maxHealingAttempts } = mergedOptions

	const { outputSchema } = content

	const request = provider.configureRequest(content, mergedOptions)

	updateState.notify(UpdateState.SendingRequest)

	const response = await provider.sendRequest(request, mergedOptions)

	updateState.notify(UpdateState.ResponseReceived)

	const updatedData = provider.extractUpdatedData(response)

	const isExpectedReturnType = Check(outputSchema, updatedData)

	if (isExpectedReturnType) {
		updateState.notify(UpdateState.Success)

		// TODO filter out extraneous properties
		return updatedData
	} else if (enableDataHealing && maxHealingAttempts > 0) {
		updateState.notify(UpdateState.HealingData)

		const errors = [...Value.Errors(outputSchema, updatedData)] // TODO Fix `never` return type

		const dataHealingOptions = {
			...mergedOptions,
			maxHealingAttempts: maxHealingAttempts - 1,
		}
		return handleDataHealing(errors, provider, content, dataHealingOptions)
	} else {
		// TODO Include `Value.errors` in error message
		const errorMessage =
			'The LLM response does not conform to the outputSchema.'

		updateState.notify({ ...UpdateState.Error, message: errorMessage })

		throw new SchemaValidationError(errorMessage)
	}
}
