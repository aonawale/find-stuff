import { read } from '$lib/db/categories'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { categoryId } }) {
	return {
		body: {
			category: read(categoryId)
		}
	}
}
