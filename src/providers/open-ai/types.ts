import type { TObject } from '@sinclair/typebox'
import OpenAI from 'openai'

import type { Content } from '@/core'

export type CreateNonStreamingChatCompletion =
	OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming

export type ChatCompletion = OpenAI.Chat.Completions.ChatCompletion

export type OpenAiOptions = {
	maxRetries: number
	model: 'gpt-3.5-turbo-1106' | 'gpt-4-1106-preview'
	timeout: number
}

export type ProviderRequest<T extends TObject, K> = {
	messages: (SystemMessage<T, K> | UserMessage)[]
	model: 'gpt-3.5-turbo-1106' | 'gpt-4-1106-preview'
	response_format: Readonly<{ type: 'json_object' }>
}

export type UserMessage = {
	role: 'user'
	content: string
}

export type SystemMessage<T extends TObject, K> = {
	role: 'system'
	content: Pick<Content<T, K>, 'context' | 'outputSchema'> & {
		taskDescription: string
	}
}

export type SerializedSystemMessage<T extends TObject, K> = SystemMessage<
	T,
	K
> & {
	content: string
}

export type SerializedRequest<T extends TObject, K> = ProviderRequest<T, K> & {
	messages: (SerializedSystemMessage<T, K> | UserMessage)[]
}
