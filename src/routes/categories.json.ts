import { list } from '$lib/db/categories'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		body: {
			categories: list()
		}
	}
}
