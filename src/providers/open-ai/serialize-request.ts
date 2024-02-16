import type { TObject } from '@sinclair/typebox'

import type {
	ProviderRequest,
	SerializedRequest,
	SerializedSystemMessage,
	UserMessage,
} from './types'

export function serializeRequest<T extends TObject, K>(
	request: ProviderRequest<T, K>,
): SerializedRequest<T, K> {
	return {
		...request,
		messages: request.messages.map((message, index) => {
			return index === 0
				? { ...message, content: JSON.stringify(message.content) }
				: message
		}) as (SerializedSystemMessage<T, K> | UserMessage)[],
	}
}
