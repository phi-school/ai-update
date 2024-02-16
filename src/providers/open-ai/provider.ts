import { type TObject, Type } from '@sinclair/typebox'
import { safeDestr } from 'destr'
import { merge } from 'ts-deepmerge'

import { openaiClient } from './client'
import { serializeRequest } from './serialize-request'
import type {
	OpenAiOptions,
	ProviderRequest,
	CreateNonStreamingChatCompletion,
	ChatCompletion,
	UserMessage,
} from './types'

import { type Options, type Content, taskDescription } from '@/core'

const defaultOptions: OpenAiOptions = {
	maxRetries: 2,
	model: 'gpt-3.5-turbo-1106',
	timeout: 20 * 1000,
}

function configureRequest<T extends TObject, K>(
	content: Content<T, K>,
	options: Options & OpenAiOptions,
): CreateNonStreamingChatCompletion {
	const mergedOptions = options
		? (merge(defaultOptions, options) as typeof options)
		: (defaultOptions as typeof options) // TODO Fix never return type

	const { context, outputSchema, userPrompts } = content

	const { model } = mergedOptions

	const request: ProviderRequest<T, K> = {
		messages: [
			{
				role: 'system',
				content: {
					taskDescription,
					context,
					outputSchema: Type.Strict(outputSchema),
				},
			},
			...(userPrompts
				? userPrompts.map(
						(prompt) => ({ role: 'user', content: prompt }) as UserMessage,
					)
				: []),
		],
		model,
		response_format: { type: 'json_object' },
	}

	return serializeRequest(request)
}

async function sendRequest(
	requestObject: CreateNonStreamingChatCompletion,
	options: OpenAiOptions,
): Promise<ChatCompletion> {
	const { maxRetries, timeout } = options

	return openaiClient.chat.completions.create(requestObject, {
		maxRetries,
		timeout,
	})
}

function extractUpdatedData<K>(response: ChatCompletion): K {
	return safeDestr<K>(response.choices[0].message.content)
}

export const OpenAIProvider = {
	configureRequest,
	sendRequest,
	extractUpdatedData,
}
