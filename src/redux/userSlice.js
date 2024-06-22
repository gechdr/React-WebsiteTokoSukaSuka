import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUser: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.listUser = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
