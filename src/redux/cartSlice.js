import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.listCart = action.payload;
    },
    updateCart: (state, action) => {
      let data = action.payload;
      let tempCart = [];
      // console.log(data);

      for (let i = 0; i < state.listCart.length; i++) {
        const c = state.listCart[i];

        for (let j = 0; j < data.length; j++) {
          const d = data[j];
          if (c.id == d.id) {
            if (d.action == "+") {
              c.qty += d.qty;

              if (c.qty > d.max) {
                c.qty = d.max;
              }
            } else {
              c.qty -= d.qty;
            }
          }
        }

        if (c.qty > 0) {
          tempCart.push(c);
        }
      }

      // console.log(tempCart);

      state.listCart = tempCart;
    },
  },
});

export const { setCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
