import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",

  initialState: {
    value: 0,
  },

  reducers: {
    setLogin: (state) => {
      state.value = 1;
    },

    unSetLogin: (state) => {
      state.value = 0;
    },
  },
});

export const { setLogin, unSetLogin } = loginSlice.actions;
export default loginSlice.reducer;
