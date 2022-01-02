export interface Icon {
	prefix: string
	suffix: string
}

export interface Category {
	id: number
	name: string
	icon: Icon
}

export interface Main {
	latitude: number
	longitude: number
}

export interface Geocodes {
	main: Main
}

export interface Location {
	address: string
	country: string
	cross_street: string
	locality: string
	postTown: string
	postcode: string
	region: string
}

export interface RelatedPlaces {}

export interface Photo {
	id: string
	createdAt: string
	prefix: string
	suffix: string
	width: number
	height: number
}

export interface Place {
	fsqId: string
	categories: Category[]
	chains: any[]
	distance: number
	geocodes: Geocodes
	location: Location
	name: string
	relatedPlaces: RelatedPlaces
	timezone: string
}

export const placeAddress = (place: Place) =>
	[place.location.address, place.location.locality, place.location.region]
		.filter((val) => val)
		.join(', ')
