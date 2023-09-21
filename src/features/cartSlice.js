import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

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

      toast.success("Added to cart", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    },

    calculateCartTotal: (state) => {
      const { item, amount } = state.cartItems.reduce(
        (acc, currentItem) => {
          acc.item = acc.item + currentItem.quantity

          const priceStr = currentItem.price
            ? String(currentItem.price).slice(0, 3)
            : String(currentItem.defaultPrice).slice(0, 3)

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
