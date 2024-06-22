import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMerk: [],
};

export const merkSlice = createSlice({
  name: "merk",
  initialState,
  reducers: {
    setMerk: (state, action) => {
      state.listMerk = action.payload;
    },
  },
});

export const { setMerk } = merkSlice.actions;

export default merkSlice.reducer;
