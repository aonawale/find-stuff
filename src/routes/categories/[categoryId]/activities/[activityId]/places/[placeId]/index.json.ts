import { read, photos } from '$lib/db/places'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { placeId }, query }) {
	return {
		body: {
			place: await read(placeId),
			photos: query.get('include').split(',').includes('photos') ? await photos(placeId) : undefined
		}
	}
}
