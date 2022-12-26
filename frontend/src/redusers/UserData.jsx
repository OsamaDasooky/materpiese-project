import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "UserData/fetchUserProfile",
  async (token) => {
    const response = await axios.request({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const initialState = {
  userData: [],
  userOrder: [],
  isLoading: false,
};

export const userDataSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.userData = action.payload;
    },
    saveOrder: (state, action) => {
      state.userOrder = action.payload;
    },
    userLogout: (state) => {
      state.userData = [];
      state.userOrder = [];
    },
  },

  extraReducers: {
    [fetchUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.data.userInfo;
      state.userOrder = action.payload.data.userOrder;
    },
  },
});

export const { saveData, saveOrder, userLogout } = userDataSlice.actions;

export default userDataSlice.reducer;
