type Listener<T> = (data: T) => void

export function createObservable<T>() {
	let listeners: Listener<T>[] = []

	function subscribe(callback: Listener<T>) {
		listeners.push(callback)

		return () => {
			// Return an unsubscribe function
			listeners = listeners.filter((listener) => listener !== callback)
		}
	}

	function notify(data: T) {
		listeners.forEach((listener) => listener(data))
	}

	return {
		subscribe,
		notify,
	}
}
