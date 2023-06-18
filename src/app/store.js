import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/cartSlice"
import authSlice from "../features/authSlice"

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
})

export default store
