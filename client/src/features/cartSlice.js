import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    getCart: (state, action) => {
      state.cartItems = action.payload
    },

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
        position: 'top-center',
      })
    },

    // removeFromCart: (state, action) => {
    //   const itemIndex = state.cartItems.findIndex(
    //     (item) => item.id === action.payload.id
    //   )

    //   if (itemIndex >= 0) {
    //     if (state.cartItems[itemIndex].quantity > 1) {
    //       state.cartItems[itemIndex].quantity -= 1

    //       toast.error('Item reduced from the cart', {
    //         position: 'top-center',
    //         autoClose: 1000,
    //         hideProgressBar: true,
    //         closeOnClick: false,
    //         pauseOnHover: false,
    //         draggable: false,
    //         progress: undefined,
    //         theme: 'light',
    //       })

    //       return
    //     }

    //     if (state.cartItems[itemIndex].quantity === 1) {
    //       state.cartItems = state.cartItems.filter(
    //         (item) => item.quantity !== 1
    //       )

    //       toast.error('Item removed from cart', {
    //         position: 'top-center',
    //         autoClose: 1000,
    //         hideProgressBar: true,
    //         closeOnClick: false,
    //         pauseOnHover: false,
    //         draggable: false,
    //         progress: undefined,
    //         theme: 'light',
    //       })

    //       return
    //     }
    //   }
    // },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1

          toast.error('Item reduced from the cart', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          })
        } else {
          state.cartItems.splice(itemIndex, 1) // Remove the item from cartItems array

          toast.error('Item removed from cart', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          })
        }
      } else {
        // No need to filter cartItems, as nothing is changed when item is not found
        toast.error('Item not found in cart', {
          position: 'top-center',
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

    calculateCartTotal: (state) => {
      const { item, amount } = state.cartItems.reduce(
        (acc, currentItem) => {
          // Parse the price to a number if it's a string
          const price = String(currentItem.price).slice(0, 3)
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

export const {
  addToCart,
  removeFromCart,
  calculateCartTotal,
  clearCart,
  getCart,
} = cartSlice.actions

export default cartSlice.reducer
