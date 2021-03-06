import type { Response } from '@sveltejs/kit'

const isObject = (obj: Record<string, unknown>) =>
	typeof obj === 'object' && !Array.isArray(obj) && obj !== null

const camelCase = (str: string) =>
	str.split('_').reduce((accum, val, index) => {
		if (index === 0) return val.toLowerCase()
		return `${accum}${val.charAt(0).toUpperCase()}${val.slice(1).toLowerCase()}`
	}, '')

export const camelCaseKeys = (obj: Record<string, unknown>): Record<string, unknown> =>
	[...Object.entries(obj)].reduce(
		(accum, [key, val]) => ({
			...accum,
			[camelCase(key)]: isObject(val as Record<string, unknown>)
				? camelCaseKeys(val as Record<string, unknown>)
				: val
		}),
		{}
	)

class SvelteError extends Error {
	url: string
	status: number

	constructor(res: Response, url: string) {
		super()
		this.url = url
		this.status = res.status
	}
}

export const fetchData = async (fetch: any, url: string) => {
	const res = await fetch(url)
	if (res.ok) return res.json()
	throw new SvelteError(res, url)
}
