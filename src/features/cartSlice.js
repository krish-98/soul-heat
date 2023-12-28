import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const cartSlice = createSlice({
  name: 'cart',
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

      toast.success('Added to the cart', {
        position: 'top-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      })
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity - 1

        if (state.cartItems[itemIndex].quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.quantity !== 0
          )

          toast.error('Item removed from cart', {
            position: 'top-left',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          })

          return
        }

        toast.warning('Quantity reduced from the cart', {
          position: 'top-left',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        })
      }
    },

    // calculateCartTotal: (state) => {
    //   const { item, amount } = state.cartItems.reduce(
    //     (acc, currentItem) => {
    //       const priceStr =
    //         currentItem?.price || currentItem?.defaultPrice
    //           ? String(currentItem?.price).slice(0, 3)
    //           : String(currentItem?.defaultPrice).slice(0, 3)

    //       acc.item = parseInt(acc.item) + parseInt(currentItem.quantity)
    //       acc.amount = parseInt(acc.item) * parseInt(priceStr)
    //       return acc
    //     },
    //     { item: 0, amount: 0 }
    //   )

    //   state.totalItems = item
    //   state.totalAmount = amount
    // },

    calculateCartTotal: (state) => {
      const { item, amount } = state.cartItems.reduce(
        (acc, currentItem) => {
          // Parse the price to a number if it's a string
          const price =
            currentItem?.price || currentItem?.defaultPrice
              ? String(currentItem?.price).slice(0, 3)
              : String(currentItem?.defaultPrice).slice(0, 3)

          acc.item += parseInt(currentItem.quantity, 10)
          acc.amount += parseInt(price, 10) * parseInt(currentItem.quantity, 10)

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
