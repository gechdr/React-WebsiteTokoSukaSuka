import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBarang: [],
};

export const barangSlice = createSlice({
  name: "barang",
  initialState,
  reducers: {
    setBarang: (state, action) => {
      state.listBarang = action.payload;
    },
    updateQty: (state, action) => {
      let data = action.payload;
      let tempBarang = [];

      for (let i = 0; i < state.listBarang.length; i++) {
        const b = state.listBarang[i];

        for (let j = 0; j < data.length; j++) {
          const d = data[j];
          if (b.id == d.id) {
            b.qty -= d.qty;
          }
        }

        tempBarang.push(b);
      }

      state.listBarang = tempBarang;
    },
  },
});

export const { setBarang, updateQty } = barangSlice.actions;

export default barangSlice.reducer;
