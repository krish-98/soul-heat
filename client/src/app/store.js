import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cartSlice'
import authSlice from '../features/authSlice'
import modalSlice from '../features/modalSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    modal: modalSlice,
  },
})

export default store
