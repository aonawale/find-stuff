export interface Activity {
	id: string
	name: string
}

export interface Category {
	id: string
	name: string
	activities: Activity[]
}

export default Category
