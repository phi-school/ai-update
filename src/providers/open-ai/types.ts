import type { TObject } from '@sinclair/typebox'
import OpenAI from 'openai'

import type { Context } from '@/core'

export type CreateNonStreamingChatCompletion =
	OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming

export type ChatCompletion = OpenAI.Chat.Completions.ChatCompletion

export type OpenAiOptions = {
	maxRetries: number
	model: 'gpt-3.5-turbo-1106' | 'gpt-4-1106-preview'
	timeout: number
}

export type Request<T extends TObject, K extends TObject> = {
	// messages: [SystemMessage<T, K>, UserMessage]
	messages: (SystemMessage<T, K> | UserMessage)[]
	model: 'gpt-3.5-turbo-1106' | 'gpt-4-1106-preview'
	response_format: Readonly<{ type: 'json_object' }>
}

export type UserMessage = {
	role: 'user'
	content: string
}

export type SystemMessage<T extends TObject, K extends TObject> = {
	role: 'system'
	content: Pick<Context<T, K>, 'currentData' | 'ExpectedOutputSchema'> & {
		taskDescription: string
	}
}

export type SerializedSystemMessage<
	T extends TObject,
	K extends TObject,
> = SystemMessage<T, K> & {
	content: string
}

export type SerializedRequest<T extends TObject, K extends TObject> = Request<
	T,
	K
> & {
	messages: (SerializedSystemMessage<T, K> | UserMessage)[]
}
