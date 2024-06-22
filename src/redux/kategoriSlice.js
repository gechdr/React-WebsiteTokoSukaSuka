import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listKategori: [],
};

export const kategoriSlice = createSlice({
  name: "kategori",
  initialState,
  reducers: {
    setKategori: (state, action) => {
      state.listKategori = action.payload;
    },
  },
});

export const { setKategori } = kategoriSlice.actions;

export default kategoriSlice.reducer;
