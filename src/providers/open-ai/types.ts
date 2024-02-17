import type { TObject } from '@sinclair/typebox'
import OpenAI from 'openai'

import type { Content } from '@/core'

export type CreateNonStreamingChatCompletion =
	OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming

export type ChatCompletion = OpenAI.Chat.Completions.ChatCompletion

export type OpenAiOptions = {
	maxRetries: number
	model: 'gpt-3.5-turbo-0125' | 'gpt-4-0125-preview'
	timeout: number
}

export type ProviderRequest<OutputSchema extends TObject, Context> = {
	messages: (SystemMessage<OutputSchema, Context> | UserMessage)[]
	model: 'gpt-3.5-turbo-0125' | 'gpt-4-0125-preview'
	response_format: Readonly<{ type: 'json_object' }>
}

export type UserMessage = {
	role: 'user'
	content: string
}

export type SystemMessage<OutputSchema extends TObject, Context> = {
	role: 'system'
	content: Pick<Content<OutputSchema, Context>, 'context' | 'outputSchema'> & {
		taskDescription: string
	}
}

export type SerializedSystemMessage<
	OutputSchema extends TObject,
	Context,
> = SystemMessage<OutputSchema, Context> & {
	content: string
}

export type SerializedRequest<
	OutputSchema extends TObject,
	Context,
> = ProviderRequest<OutputSchema, Context> & {
	messages: (SerializedSystemMessage<OutputSchema, Context> | UserMessage)[]
}
