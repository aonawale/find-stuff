import { readActivity } from '$lib/db/categories'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { categoryId, activityId } }) {
	return {
		body: {
			activity: readActivity(categoryId, activityId)
		}
	}
}
