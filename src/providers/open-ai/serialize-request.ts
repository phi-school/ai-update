import type { TObject } from '@sinclair/typebox'

import type {
	Request,
	SerializedRequest,
	SerializedSystemMessage,
	UserMessage,
} from './types'

/**
 * NOTE: Type SerializedRequestObject<T, K> currently assumes that there will be
 * only one UserMessage.
 */
export function serializeRequest<T extends TObject, K extends TObject>(
	request: Request<T, K>,
): SerializedRequest<T, K> {
	return {
		...request,
		messages: request.messages.map((message, index) => {
			return index === 0
				? { ...message, content: JSON.stringify(message.content) }
				: message
			// }) as [SerializedSystemMessage<T, K>, UserMessage],
		}) as (SerializedSystemMessage<T, K> | UserMessage)[],
	}
}
