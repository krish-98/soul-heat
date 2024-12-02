import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  name: string
  price: number | string
  quantity: number
}

interface InitialState {
  cartItems: CartItem[]
  totalItems: number
  totalAmount: number
}
const initialState: InitialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity + 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }

      toast.success('Added to the cart')
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; message?: string }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (itemIndex !== -1) {
        if (
          action.payload.message === 'Cart deleted' ||
          state.cartItems[itemIndex].quantity === 1
        ) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          )

          toast.error('Item removed from cart')

          return
        }

        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1

          toast.error('Item reduced from the cart')

          return
        }
      }
    },

    //check for error if you face any
    // calculateCartTotal: (state) => {
    //   const { item, amount } = state.cartItems.reduce(
    //     (acc, currentItem) => {
    //       // Parse the price to a number if it's a string
    //       const price = String(currentItem.price).slice(0, 3)

    //       acc.item += parseInt(currentItem.quantity, 10)
    //       acc.amount += parseInt(price, 10) * parseInt(currentItem.quantity, 10)

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
