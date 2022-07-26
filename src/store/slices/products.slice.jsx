import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        updateProducts:(state, action)=>{
            return action.payload
        }
    }
})

export const {updateProducts} = productsSlice.actions
export default productsSlice.reducer

export const getProducts=()=>async(dispatch, getState)=>{
    const state = getState()
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${state.userLog.token}` }
      });
    if(state.userLog.isLogin){
        const products = await axios.get('https://ecommerce-exercise-backend.herokuapp.com/products/', getConfig())
        return(dispatch(updateProducts(products.data)))
    }

}