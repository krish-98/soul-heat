import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: { modal: false },
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload
    },
  },
})

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
