export type CustomMergeFunction = <T extends object>(
	currentData: T,
	updatedData: Partial<T>,
) => T

export type AiUpdateOptions = {
	enableDataHealing: boolean
	maxHealingAttempts: number
	customMergeFunction?: CustomMergeFunction
	returnUpdatedDataOnly?: boolean // New option
}
