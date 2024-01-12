import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allImages: null,
}

const allImagesSlice = createSlice({
  name: "allImages",
  initialState,
  reducers: {
    getAllImages: (state, action) => {
      state.allImages = action.payload;
    },
  },
});

export const { getAllImages } = allImagesSlice.actions;
export default allImagesSlice.reducer;