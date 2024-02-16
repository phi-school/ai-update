import type { TObject } from '@sinclair/typebox'

import type {
	ProviderRequest,
	SerializedRequest,
	SerializedSystemMessage,
	UserMessage,
} from './types'

export function serializeRequest<OutputSchema extends TObject, Context>(
	request: ProviderRequest<OutputSchema, Context>,
): SerializedRequest<OutputSchema, Context> {
	return {
		...request,
		messages: request.messages.map((message, index) => {
			return index === 0
				? { ...message, content: JSON.stringify(message.content) }
				: message
		}) as (SerializedSystemMessage<OutputSchema, Context> | UserMessage)[],
	}
}
