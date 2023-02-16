import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    isActive: false,
    lastLogin: "",
    name: "",
    phone: "",
    profilePicture: null,
    registeryNo: "",
    surname: "",
  },
  token: {
    accessToken: "",
    expiresIn: 0,
  },
  id: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.email = action.payload.user.email;
      state.user.isActive = action.payload.user.isActive;
      state.user.lastLogin = action.payload.user.lastLogin;
      state.user.name = action.payload.user.name;
      state.user.phone = action.payload.user.phone;
      state.user.profilePicture = action.payload.user.profilePicture;
      state.user.registeryNo = action.payload.user.registeryNo;
      state.user.surname = action.payload.user.surname;
      state.token.accessToken = action.payload.token.accessToken;
      state.token.expiresIn = action.payload.token.expiresIn;
      state.id = action.payload.id;
    },
    clearUser: (state) => {
      state = initialState;
    },
    updateUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.phone = action.payload.phone;
      state.user.surname = action.payload.surname;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
