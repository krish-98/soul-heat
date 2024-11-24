import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    authenticateUser: (state, action) => {
      const { user, token } = action.payload

      state.user = user
      state.token = token
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { authenticateUser, logout } = authSlice.actions

export default authSlice.reducer
