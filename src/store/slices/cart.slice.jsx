import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loading.slice'
import axios from 'axios'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    initCart: (state, action) => {
      return action.payload
    },
    uploadCart: (state, action) => {
      const newCart = state.map((cart) => {
        if (cart.id == action.payload.id) return action.payload
        return cart
      })
      return newCart
    },
    cleanCart: (state, action) => {
      return ([])
    },
    addItemToCart: (state, action) => {
      const newCart = state.concat(action.payload)
      return newCart
    },
    removeItemFromCart: (state, action) => {
      const newCart = state.filter(element => element.id != action.payload)
      return newCart
    }
  }
})

export const { uploadCart, initCart, cleanCart, addItemToCart, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer

export const getUploadCart = (id, quantity) => async (dispatch, getState) => {
  dispatch(setLoading(true))
  const { userLog, cart } = getState()
  const itemCart = cart.filter(item => item.product.id == id)
  const addCart = {
    product: id,
    quantity: quantity
  }
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userLog.token}` }
  });
  if (itemCart.length === 1) {
    const setQuantity = {
      quantity: quantity
    }
    const res = await axios.put(`https://ecommerce-exercise-backend.herokuapp.com/cart/${itemCart[0].id}/change_quantity/`, setQuantity, getConfig())
    dispatch(setLoading(false))
    return (dispatch(uploadCart(res.data)))
  }
  const res = await axios.post('https://ecommerce-exercise-backend.herokuapp.com/products/add_to_cart/', addCart, getConfig())
  dispatch(setLoading(false))
  return (dispatch(addItemToCart(res.data)))
}

export const setRemoveItem = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true))
  const { userLog } = getState()
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userLog.token}` }
  });
  const res = await axios.delete(`https://ecommerce-exercise-backend.herokuapp.com/cart/${id}/remove_item/`, getConfig())
  if (res.status === 204) {
    dispatch(setLoading(false))
    return (dispatch(removeItemFromCart(id)))
  }
  dispatch(setLoading(false))
  return
}
export const removeAllItemsCart = () => (dispatch, getState) => {
  dispatch(setLoading(true))
  const { userLog } = getState()
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userLog.token}` }
  });
  axios.delete('https://ecommerce-exercise-backend.herokuapp.com/cart/empty_cart/', getConfig())
    .then(res => {
      dispatch(cleanCart())
    })
    .catch(error => console.log(error))
    .finally(dispatch(setLoading(false)))
}
//Se necesita incluir login para confirmar compras
export const setBuyCartItems = (loginConfirm) => (dispatch, getState) => {
  dispatch(setLoading(true))
  const { userLog } = getState()
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userLog.token}` }
  });
  axios.post('https://ecommerce-exercise-backend.herokuapp.com/cart/buy/', loginConfirm, getConfig())
    .then(res => {
      dispatch(cleanCart())
    })
    .catch(error => console.log(error))
    .finally(dispatch(setLoading(false)))
}