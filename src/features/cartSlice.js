import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalItems: 0,
    totalAmount: 0,
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

    calculateCartTotal: (state) => {
      const { item, amount } = state.cartItems.reduce(
        (acc, currentItem) => {
          acc.item = acc.item + currentItem.quantity

          const priceStr = String(currentItem.price).slice(0, 3)
          acc.amount = acc.item * Number(priceStr)

          return acc
        },
        { item: 0, amount: 0 }
      )

      state.totalItems = item
      state.totalAmount = amount
    },

    clearCart: (state) => {
      state.cartItems = []
      state.totalItems = 0
      state.totalAmount = 0
    },
  },
})

export const { addToCart, calculateCartTotal, clearCart } = cartSlice.actions

export default cartSlice.reducer
