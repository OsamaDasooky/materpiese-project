import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shopData: [],
  isLoading: false,
};
export const fetchShopProfileData = createAsyncThunk(
  "ShopData/fetchShopProfile",
  async (token) => {
    const response = await axios.request({
      method: "get",
      url: "http://127.0.0.1:8000/api/shop/profile",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

export const ShopReducer = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShopProfileData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchShopProfileData.fulfilled]: (state, action) => {
      state.shopData = action.payload.data;
      state.isLoading = false;
    },
  },
});

// export const { saveData, saveOrder } = ShopReducer.actions;

export default ShopReducer.reducer;
