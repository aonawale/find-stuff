import categories from '$lib/content/categories'
import type Category from '$lib/types/category'

const types = new Map(
	Object.entries({
		10000: 'art',
		10027: 'museum',
		16000: 'Landmarks and Outdoors',
		18054: 'Skating',
		18058: 'Snow Sport',
		18067: 'Water Sport',
		18073: 'Swimming',
		19000: 'Travel and Transportation',
		19028: 'Tourist Information and Service',
		19030: 'Transport Hub',
		19051: 'Transportation Service',
		18000: 'Sports and Recreation'
	})
)

const categoriesMap = Object.entries(categories).reduce((accum, [key, val]) => {
	const parentId = val.parents[0]
	if (!types.has(parentId) || !categories[parentId]) return accum

	const category = accum.get(parentId) || {
		id: parentId,
		name: categories[parentId].labels.en,
		activities: []
	}

	category.activities.push({
		id: key,
		name: val.labels.en,
		categoryId: parentId
	})

	if (!accum.has(parentId)) accum.set(parentId, category)

	return accum
}, new Map<string, Category>())

/** @typedef {import('../types/category').Category} Category */
/** @typedef {import('../types/category').Activity} Activity */

/**
 * @returns {Array<Category>}
 */
export const list = () => [...categoriesMap.values()]

/**
 * @param {string} id
 * @returns {Category}
 */
export const read = (id: string) => categoriesMap.get(id)

/**
 * @param {string} categoryId
 * @param {string} activityId
 * @returns {Category}
 */
export const readActivity = (categoryId: string, activityId: string) =>
	categoriesMap.get(categoryId)?.activities.find(({ id }) => id === activityId)
