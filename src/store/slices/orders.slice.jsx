import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {setLoading} from './loading.slice'

export const  ordersSlicer = createSlice({
    name:'orders',
    initialState: [],
    reducers:{
        getUploadOrders:(state, action)=>{
            return action.payload
        }
    }
})

export const {getUploadOrders} = ordersSlicer.actions

export default ordersSlicer.reducer

export const getOrdersOfUser=()=>async(dispatch, getState)=>{
    dispatch(setLoading(true))
    const {userLog} = getState()
    console.log(userLog)
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${userLog.token}` }
    });
    const res = await axios.post('https://ecommerce-exercise-backend.herokuapp.com/orders/',getConfig())
    console.log(res)
    if(res.status===200){
        dispatch(getUploadOrders(res.data))
        return dispatch(setLoading(false))
    }
    return dispatch(setLoading(false))
}