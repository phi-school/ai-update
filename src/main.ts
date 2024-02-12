export const hello = () => 'Hello via Bun!'

console.log(hello())

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test('hello', () => {
		expect(hello()).toBe('Hello via Bun!')
	})
}
