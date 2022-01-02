import { camelCaseKeys } from '$lib/utils/utils'

const FOURSQUARE_API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY as string

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type RequestHeaders = Record<string, string>
type RequestBody = Record<string, unknown>

const makeRequest =
	({ host, token }: { host: string; token?: string }) =>
	async ({
		path,
		method = 'GET',
		headers,
		body
	}: {
		path: string
		method?: RequestMethod
		headers?: RequestHeaders
		body?: RequestBody
	}) => {
		const opts: { body?: string; headers?: RequestHeaders; method: RequestMethod } = {
			method,
			headers: {}
		}

		if (body) {
			opts.headers['Content-Type'] = 'application/json'
			opts.body = JSON.stringify(body)
		}
		if (token) {
			opts.headers['Authorization'] = token
		}
		if (headers) {
			opts.headers = { ...opts.headers, ...headers }
		}

		return fetch(`${host}${path}`, opts).then((r) => r.json())
	}

const fsRequest = makeRequest({ host: 'https:api.foursquare.com/v3', token: FOURSQUARE_API_KEY })

/** @typedef {import('../types/Place').Place} Place */
/** @typedef {import('../types/Place').Photo} Photo */

/**
 * @param {string} categoryId
 * @param {string} near
 * @returns {Array<Place>}
 */
export const search = async (categoryId: string, near: string) => {
	const { results } = await fsRequest({
		path: `/places/search?categories=${categoryId}&near=${encodeURIComponent(near)}`
	})
	return results.map(camelCaseKeys)
}

/**
 * @param {string} placeId
 * @returns {Place}
 */
export const read = async (placeId: string) =>
	camelCaseKeys(
		await fsRequest({
			path: `/places/${placeId}`
		})
	)

/**
 * @param {string} placeId
 * @returns {Array<Photo>}
 */
export const photos = async (placeId: string) =>
	(
		await fsRequest({
			path: `/places/${placeId}/photos`
		})
	).map(camelCaseKeys)
