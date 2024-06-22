import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  totalSales: 0,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setTotalSales: (state, action) => {
      state.totalSales = action.payload;
    },
  },
});

export const { setData, setTotalSales } = reportSlice.actions;

export default reportSlice.reducer;
