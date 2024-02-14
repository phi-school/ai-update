export type CustomMergeFunction = <T>(
	currentData: T,
	updatedData: Partial<T>,
) => T

export type AiUpdateOptions = {
	enableDataHealing: boolean
	maxHealingAttempts: number
	customMergeFunction?: CustomMergeFunction
}
