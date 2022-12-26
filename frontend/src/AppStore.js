import { configureStore } from "@reduxjs/toolkit";
import AllShopsReducer from "./redusers/AllShopsReducer";
import CartReducer from "./redusers/CartReduser";
import ShopReducer from "./redusers/ShopProfileReduser";
import UserData from "./redusers/UserData";

export const store = configureStore({
  reducer: {
    userData: UserData,
    shops: AllShopsReducer,
    shopProfile: ShopReducer,
    cart: CartReducer,
  },
});
