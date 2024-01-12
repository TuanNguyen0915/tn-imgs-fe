import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentImage: null,
  loading: false,
  error: false
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    fetchImageStart: (state) => {
      state.loading = true
    },
    fetchImageSuccess: (state, action) => {
      state.currentImage = action.payload
      state.loading = false
      state.error = false
    },
    fetchImageFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
})

export const {fetchImageStart, fetchImageFailure, fetchImageSuccess} = imageSlice.actions
export default imageSlice.reducer