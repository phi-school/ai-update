type Listener<OutputSchema> = (data: OutputSchema) => void

export function createObservable<OutputSchema>() {
	let listeners: Listener<OutputSchema>[] = []

	function subscribe(callback: Listener<OutputSchema>) {
		listeners.push(callback)

		return () => {
			// Return an unsubscribe function
			listeners = listeners.filter((listener) => listener !== callback)
		}
	}

	function notify(data: OutputSchema) {
		listeners.forEach((listener) => listener(data))
	}

	return {
		subscribe,
		notify,
	}
}
