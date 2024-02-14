import { merge } from 'ts-deepmerge'

export const defaultMergeStrategy = <T>(
	currentData: T,
	updatedData: Partial<T>,
): T => {
	return merge(currentData as object, updatedData as object) as T
}
