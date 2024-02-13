import { merge } from 'ts-deepmerge'

export const defaultMergeStrategy = <T extends object>(
	currentData: T,
	updatedData: Partial<T>,
): T => {
	return merge(currentData, updatedData) as T
}
