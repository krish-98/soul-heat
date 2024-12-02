import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  user: User | null
  token: string
}

export interface User {
  _id: string
  name: string
  email: string
  avatar: string
}

const initialState: InitialState = {
  user: null,
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
    updateToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload

      if (token) state.token = token
    },
    logout: (state) => {
      state.user = null
      state.token = ''
    },
  },
})

export const { authenticateUser, updateToken, logout } = authSlice.actions

export default authSlice.reducer
