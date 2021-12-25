import { camelCaseKeys } from '$lib/utils/utils'

const FOURSQUARE_API_KEY = process.env['FOURSQUARE_API_KEY']
console.log('FOURSQUARE_API_KEY', FOURSQUARE_API_KEY)
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

		return fetch(`${host}/${path}`, opts).then((r) => r.json())
	}

const fsRequest = makeRequest({ host: 'https:api.foursquare.com/v3', token: FOURSQUARE_API_KEY })

/** @typedef {import('../types/Place').Place} Place */

/**
 * @param {string} query
 * @param {string} near
 * @returns {Array<Place>}
 */
export const search = async (query: string, near: string) => {
	const { results } = await fsRequest({
		path: `/places/search?query=${encodeURIComponent(query)}&near=${encodeURIComponent(near)}`
	})
	return results.map(camelCaseKeys)
}
