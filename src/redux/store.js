import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import routeReducer from "./routeSlice";
import userReducer from "./userSlice";
import barangReducer from "./barangSlice";
import kategoriReducer from "./kategoriSlice";
import merkReducer from "./merkSlice";
import transactionReducer from "./transactionSlice";
import cartReducer from "./cartSlice";
import reportReducer from "./reportSlice";

const store = configureStore({
  reducer: {
    route: routeReducer,
    [api.reducerPath]: api.reducer,
    user: userReducer,
    barang: barangReducer,
    kategori: kategoriReducer,
    merk: merkReducer,
    transaction: transactionReducer,
    cart: cartReducer,
    report: reportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;
