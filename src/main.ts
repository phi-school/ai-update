import type { Static, TObject } from '@sinclair/typebox'
import { Check, Value } from '@sinclair/typebox/value'
import { merge } from 'ts-deepmerge'

import {
	defaultMergeStrategy,
	handleDataHealing,
	type AiUpdateOptions,
	type LanguageModelProvider,
	type Context,
} from '@/core'
import { SchemaValidationError } from '@/errors'
import {
	createObservable,
	UpdateState,
	type UpdateStateType,
} from '@/observables'

const defaultOptions: AiUpdateOptions = {
	enableDataHealing: false,
	maxHealingAttempts: 0,
}

const updateState = createObservable<UpdateStateType>()
export const aiUpdateState = updateState

// TODO Better manage type exports and provider exports. Consider a single file
// for exported types and add it to the tsup config.
export { OpenAIProvider, type AiUpdateOpenAiOptions } from '@/providers'

export async function aiUpdate<
	T extends TObject,
	K extends TObject,
	Request extends object,
	Options extends object,
	Response extends object,
>({
	provider,
	context,
	options,
}: {
	provider: LanguageModelProvider<T, K, Request, Options, Response>
	context: Context<T, K>
	options?: Partial<AiUpdateOptions & Options>
}): Promise<Static<T>> {
	updateState.notify(UpdateState.Initializing)

	type MergedOptions = AiUpdateOptions & Options

	const mergedOptions = options
		? (merge(defaultOptions, options) as MergedOptions)
		: (defaultOptions as MergedOptions)

	const { customMergeFunction, enableDataHealing, maxHealingAttempts } =
		mergedOptions

	const { currentData, ExpectedOutputSchema } = context

	const request = provider.configureRequest(context, mergedOptions)

	updateState.notify(UpdateState.SendingRequest)

	const response = await provider.sendRequest(request, mergedOptions)

	updateState.notify(UpdateState.ResponseReceived)

	const updatedData = provider.extractUpdatedData(response)

	const isExpectedReturnType = Check(ExpectedOutputSchema, updatedData)

	// TODO Simplify complex conditional
	if (isExpectedReturnType) {
		updateState.notify(UpdateState.Success)

		const finalData = customMergeFunction
			? customMergeFunction(currentData, updatedData)
			: defaultMergeStrategy(currentData, updatedData)

		return finalData
	} else if (enableDataHealing && maxHealingAttempts > 0) {
		updateState.notify(UpdateState.HealingData)

		const errors = [...Value.Errors(ExpectedOutputSchema, updatedData)] // TODO Fix `never` return type

		const dataHealingOptions: MergedOptions = {
			...mergedOptions,
			maxHealingAttempts: maxHealingAttempts - 1,
		}
		return handleDataHealing(errors, provider, context, dataHealingOptions)
	} else {
		// TODO Include `Value.errors` in error message
		const errorMessage =
			'The LLM response does not conform to the ExpectedOutputSchema.'

		updateState.notify({ ...UpdateState.Error, message: errorMessage })

		throw new SchemaValidationError(errorMessage)
	}
}
