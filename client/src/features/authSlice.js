import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    authenticateUser: (state, action) => {
      state.user = action.payload.user
    },
    updateToken: (state, action) => {
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
