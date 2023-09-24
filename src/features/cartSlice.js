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

      toast.success("Added to the cart", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity - 1

        toast.warning("Quantity reduced from the cart", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        })
      }

      if (state.cartItems[itemIndex].quantity === 0) {
        state.cartItems = state.cartItems.filter((item) => item.quantity !== 0)

        toast.error("Item removed from cart", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        })
      }
    },

    calculateCartTotal: (state) => {
      const { item, amount } = state.cartItems.reduce(
        (acc, currentItem) => {
          const priceStr =
            currentItem?.price || currentItem?.defaultPrice
              ? String(currentItem.price).slice(0, 3)
              : String(currentItem.defaultPrice).slice(0, 3)

          acc.item = acc.item + currentItem.quantity
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

export const { addToCart, removeFromCart, calculateCartTotal, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
