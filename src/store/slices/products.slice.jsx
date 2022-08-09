import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loading.slice'
import axios from 'axios'
export const productsSlice = createSlice({
	name: 'products',
	initialState: [],
	reducers: {
		updateProducts: (state, action) => {
			return action.payload
		}
	}
})

export const { updateProducts } = productsSlice.actions
export default productsSlice.reducer

export const getProducts = () => async (dispatch, getState) => {
	dispatch(setLoading(true))
	const state = getState()
	const getConfig = () => ({
		headers: { Authorization: `Bearer ${state.userLog.token}` }
	});
	if (state.userLog.isLogin) {
		const products = await axios.get('https://ecommerce-exercise-backend.herokuapp.com/products/', getConfig())
		dispatch(setLoading(false))
		return (dispatch(updateProducts(products.data)))
	}
	dispatch(setLoading(false))
	return
}

export const getProductsByCategory = (id) => async (dispatch, getState) => {
	dispatch(setLoading(true))
	const state = getState()
	const getConfig = () => ({
		headers: { Authorization: `Bearer ${state.userLog.token}` }
	});
	if (state.userLog.isLogin) {
		const products = await axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?category=${id}`, getConfig())
		dispatch(setLoading(false))
		return (dispatch(updateProducts(products.data)))
	}
	dispatch(setLoading(false))
	return
}

export const getProductsByName = (query) => async (dispatch, getState) => {
	dispatch(setLoading(true))
	const state = getState()
	const getConfig = () => ({
		headers: { Authorization: `Bearer ${state.userLog.token}` }
	});
	if (state.userLog.isLogin) {
		const products = await axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?name__icontains=${query}`, getConfig())
		dispatch(setLoading(false))
		return (dispatch(updateProducts(products.data)))
	}
	dispatch(setLoading(false))
	return
}