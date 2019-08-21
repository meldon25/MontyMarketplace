import axios from 'axios'
const JwtToken = 'token'
const api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const getProducts = async () => {
	try {
		const resp = await api.get('/apparel')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getCategories = async () => {
	try {
		const resp = await api.get('/categories')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getProduct = async (id) => {
	try {
		const resp = await api.get(`/apparel/${id}`)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getPhones = async () => {
	try {
		const resp = await api.get('/phones')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getPhone = async (id) => {
	try {
		const resp = await api.get(`/phones/${id}`)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getInventory = async () => {
	try {
		const resp = await api.get('/inventory')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getOrders = async () => {
	try {
		const orders = await api.get('/orders')
		return orders.data
	} catch (error) {
		throw error
	}
}

export const getCustomers = async () => {
	try {
		const resp = await api.get('/orders/customers')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getProductsByCategory = async (categories) => {
	console.log(categories)
	try {
		const resp = await api.get(
			`/categories/filter/${JSON.stringify(categories)}`
		)
		console.log(resp)
		return resp.data
	} catch (error) {
		throw error
	}
}
