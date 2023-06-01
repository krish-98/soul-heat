import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity + 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
