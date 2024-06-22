import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listTransaction: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.listTransaction = action.payload;
    },
    updateStatus: (state, action) => {
      let data = action.payload;
      let tempTransaction = [];

      for (let i = 0; i < state.listTransaction.length; i++) {
        const t = state.listTransaction[i];

        for (let j = 0; j < data.length; j++) {
          const d = data[j];
          if (t.id == d.id) {
            console.log(d.status);
            t.status = d.status;
            t.idKasir = d.idKasir;
          }
        }
        tempTransaction.push(t);
      }

      state.listTransaction = tempTransaction;
    },
  },
});

export const { setTransaction, updateStatus } = transactionSlice.actions;

export default transactionSlice.reducer;
