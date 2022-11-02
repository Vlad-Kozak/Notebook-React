import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authOperations } from "./authOperations";

interface IInitialState {
  user: { email: string | null };
  token: string | null;
  isLoggedIn: boolean;
  isLoadingRefresh: boolean;
  isLoadingRegister: boolean;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
}

const initialState: IInitialState = {
  user: { email: null },
  token: null,
  isLoggedIn: false,
  isLoadingRefresh: false,
  isLoadingRegister: false,
  isLoadingLogin: false,
  isLoadingLogout: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authOperations.register.pending, (state) => {
      state.isLoadingRegister = true;
    });
    builder.addCase(authOperations.register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoadingRegister = false;
    });
    builder.addCase(authOperations.register.rejected, (state, action) => {
      state.isLoadingRegister = false;
      switch (action.payload) {
        case 400:
          toast.error("Wrong email or password, please try again.");
          break;

        case 409:
          toast.error("This email is using");
          break;

        case 500:
          toast.error("Server error, please try again later");
          break;

        default:
          toast.error("Error");
      }
    });
    builder.addCase(authOperations.login.pending, (state, action) => {
      state.isLoadingLogin = true;
    });
    builder.addCase(authOperations.login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoadingLogin = false;
    });
    builder.addCase(authOperations.login.rejected, (state, action) => {
      state.isLoadingLogin = false;
      switch (action.payload) {
        case 400:
          toast.error("Wrong email or password, please try again.");
          break;

        case 401:
          toast.error("Wrong email or password, please try again.");
          break;

        case 500:
          toast.error("Server error, please try again later");
          break;

        default:
          toast.error("Error");
      }
    });
    builder.addCase(authOperations.logout.pending, (state) => {
      state.isLoadingLogout = true;
    });
    builder.addCase(authOperations.logout.fulfilled, (state) => {
      state.user = { email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoadingLogout = false;
    });
    builder.addCase(authOperations.logout.rejected, (state, action) => {
      state.isLoadingLogout = false;
      switch (action.payload) {
        case 500:
          toast.error("Server error, please try again later");
          break;

        default:
          toast.error("Error");
      }
    });
    builder.addCase(authOperations.fetchCurrentUser.pending, (state) => {
      state.isLoadingRefresh = true;
    });
    builder.addCase(
      authOperations.fetchCurrentUser.fulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoadingRefresh = false;
      }
    );
    builder.addCase(authOperations.fetchCurrentUser.rejected, (state) => {
      state.isLoadingRefresh = false;
    });
  },
});

export const AuthReducer = auth.reducer;
