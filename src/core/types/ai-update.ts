export type CustomMergeFunction = <T>(
	currentData: T,
	updatedData: Partial<T>,
) => T

export type Options = {
	enableDataHealing: boolean
	maxHealingAttempts: number
	customMergeFunction?: CustomMergeFunction
}
