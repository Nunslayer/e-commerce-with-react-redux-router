import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogSlice = createSlice({
    name: 'userLog',
    initialState: {
        isLogin:null,
        token:null
    },
    reducers: {
        getUserLog:(state, action)=>{
            return {
                isLogin: true,
                token:action.payload}
        },
        setUserUnlog:(state, action)=>{
            return{
                isLogin: false,
                token: null}
        },
        setInitLogValue:(state, action)=>{
            return{
                isLogin: null,
                token: null}
        }
    }
})

export const {getUserLog, setUserUnlog, setInitLogValue} = userLogSlice.actions
export default userLogSlice.reducer
export const loginUser=(formLogin)=>(dispatch, getState)=>{
    const products = getState()
    console.log(products)
    axios.post('https://ecommerce-exercise-backend.herokuapp.com/login/', formLogin)
        .then(res=>{
            dispatch(getUserLog(res.data.access))
        })
        .catch(error=>{
            dispatch(setUserUnlog())
        })  
}