import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogSlice = createSlice({
    name: 'userLog',
    initialState: {
        isLogin:false,
        token:null
    },
    reducers: {
        getUserLog:(state, action)=>{
            return {
                isLogin: true,
                token:action.payload}
            // return action.payload
        },
        setUserUnlog:(state,action)=>{
            return{
                isLogin: false,
                token: null}
        }
    }
})

export const {getUserLog, setUserUnlog} = userLogSlice.actions
export default userLogSlice.reducer
export const loginUser=(formLogin)=>async(dispatch, getState)=>{
    // const getConfig = () => ({
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    const products = getState()
    console.log(products)
    const res = await axios.post('https://ecommerce-exercise-backend.herokuapp.com/login/', formLogin)
    return (dispatch(getUserLog(res.data.access)))
}