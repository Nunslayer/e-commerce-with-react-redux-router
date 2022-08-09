import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
	name: 'token',
	initialState: null,
	reducers: {
		uploadToken: (state, action) => {
			return action.payload
		}
	}
})

export const { uploadToken } = tokenSlice.actions

export default tokenSlice.reducer