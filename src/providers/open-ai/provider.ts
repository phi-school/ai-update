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
	model: 'gpt-3.5-turbo-0125',
	timeout: 10 * 1000, // 10 seconds
}

function configureRequest<OutputSchema extends TObject, Context>(
	content: Content<OutputSchema, Context>,
	options: Options & OpenAiOptions,
): CreateNonStreamingChatCompletion {
	const mergedOptions = merge(defaultOptions, options)

	const { context, outputSchema, userPrompts } = content

	const { model } = mergedOptions

	const request: ProviderRequest<OutputSchema, Context> = {
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

function extractUpdatedData<Context>(response: ChatCompletion): Context {
	return safeDestr<Context>(response.choices[0].message.content)
}

export const OpenAIProvider = {
	configureRequest,
	sendRequest,
	extractUpdatedData,
}
