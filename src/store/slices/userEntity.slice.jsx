import {createSlice} from '@reduxjs/toolkit'
import { initCart } from './cart.slice'
import axios from 'axios'

export const userEntitySlice = createSlice({
    name:'userEntity',
    initialState:{
        id: null,
        email:'',
        first_name:'',
        last_name:'',
        cart:[],
        orders:[]
    },
    reducers:{
        getUserDates:(state, action)=>{
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {getUserDates} = userEntitySlice.actions

export default userEntitySlice.reducer

export const initialUserDates=()=>async(dispatch, getState)=>{
    const {userLog} = getState()
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${userLog.token}` }
      });
    if(userLog.isLogin){
        const res = await axios.get('https://ecommerce-exercise-backend.herokuapp.com/users/myself/',getConfig())
        dispatch(initCart(res.data.cart))
        return(dispatch(getUserDates(res.data)))
    }
}