import {configureStore} from '@reduxjs/toolkit'
import productsSlice from './slices/products.slice'
import userLogSlice from './slices/userLog.slice'
import tokenSlice from './slices/token.slice'
import userEntitySlice from './slices/userEntity.slice'
import cartSlice from './slices/cart.slice'
import loadingSlice from './slices/loading.slice'
export default configureStore({
    reducer:{
        userLog: userLogSlice,
        products: productsSlice,
        token: tokenSlice,
        userEntity: userEntitySlice,
        cart: cartSlice,
        loading: loadingSlice
    }
})