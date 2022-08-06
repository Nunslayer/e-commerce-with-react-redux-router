import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {setLoading} from './loading.slice'

export const  ordersSlicer = createSlice({
    name:'orders',
    initialState: [],
    reducers:{
        getUploadOrders:(state, action)=>{
            console.log(action)
            return action.payload
        },
        sortByDate:(state, action)=>{
            let auxArray = [...state]
            auxArray = auxArray.sort((a, b)=>{
                const dateA = new Date(a.purchase_date)
                const dateB = new Date(b.purchase_date)
                return dateA - dateB
            })
            return auxArray
        },
        sortByQuantity:(state, action)=>{
            let auxArray = [...state]
            auxArray = auxArray.sort((a, b)=> a.quantity - b.quantity)
            return auxArray
        },
        sortByName:(state, action)=>{
            let auxArray = [...state]
            auxArray = auxArray.sort((a, b)=>{
                const nameA = a.product.name.toLowerCase()
                const nameB = b.product.name.toLowerCase()
                if(nameA < nameB){
                    return -1
                }
                if(nameA > nameB){
                    return 1
                }
                return 0
            })
            return auxArray
        },
        sortByPrice:(state, action)=>{
            let auxArray = [...state]
            auxArray = auxArray.sort((a, b)=>{
                const priceA = a.product.price
                const priceB = b.product.price
                return priceA - priceB
            })
            return auxArray
        },
        reverseSort:(state, action)=>{
            let auxArray = [...state]
            auxArray = auxArray.reverse()
            return auxArray
        }
    }
})

export const {getUploadOrders, sortByDate, sortByName, sortByPrice, sortByQuantity, reverseSort} = ordersSlicer.actions

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
