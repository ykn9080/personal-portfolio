import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: null,
  isLogin: false,
  count: 0,
  tags: [],
  theme: "light",
};

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state[Object.keys(action.payload)[0]] = Object.values(action.payload)[0];
    },
  },
});
export const { updateValue } = global.actions;
export default global.reducer;
