import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: "login",
  id: -1,
  routeAdmin: "list",
  routePembeli: "list",
  routeHistoryPembeli: "list",
  routeKasir: "home",
  routeHistoryKasir: "list",
  active: null,
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setRouteAdmin: (state, action) => {
      state.routeAdmin = action.payload;
    },
    setRoutePembeli: (state, action) => {
      state.routePembeli = action.payload;
    },
    setRouteKasir: (state, action) => {
      state.routeKasir = action.payload;
    },
    setRouteHistoryPembeli: (state, action) => {
      state.routeHistoryPembeli = action.payload;
    },
    setRouteHistoryKasir: (state, action) => {
      state.routeHistoryKasir = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {
  setRoute,
  setId,
  setRouteAdmin,
  setRoutePembeli,
  setRouteKasir,
  setRouteHistoryPembeli,
  setRouteHistoryKasir,
  setActive,
} = routeSlice.actions;

export default routeSlice.reducer;
