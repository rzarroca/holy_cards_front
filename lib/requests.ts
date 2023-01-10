import axios from 'axios'

export const serverReq = axios.create({
	baseURL: '/api',
})

export const apiReq = axios.create({
	baseURL: process.env.API_HOST,
	timeout: 3000,
	headers: {
		Accept: 'application/json',
	},
})
