export interface HolyCard {
	id: number
	name: string
	description: string
	is_active: boolean
	image_url: string
}

export interface User {
	id: number | string
	name: string
	email: string
	role: string
}
