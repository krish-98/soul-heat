import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = state.cart[itemIndex].quantity + 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
