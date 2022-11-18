import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

axios.defaults.baseURL = "https://notebook-api-zaklaxd.herokuapp.com/api";

interface IGoogleCredentials {
  code: string;
}

interface IUserCredentials {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  id: string;
}

interface IUserResponse {
  user: IUser;
  token: string;
}

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk<
  IUserResponse,
  IUserCredentials,
  { rejectValue: any }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    await axios.post("/auth/register", credentials);
    const { data } = await axios.post("/auth/login", credentials);
    token.set(data.token);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.status);
  }
});

const login = createAsyncThunk<
  IUserResponse,
  IUserCredentials,
  { rejectValue: any }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    token.set(data.token);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.status);
  }
});

const googleAuth = createAsyncThunk<
  IUserResponse,
  IGoogleCredentials,
  { rejectValue: any }
>("auth/google", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/google", credentials);
    token.set(data.token);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.status);
  }
});

const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/auth/logout");
      token.unset();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  "/auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const { root } = getState() as RootState;

    if (root.auth.token === null) {
      return rejectWithValue({
        error: { message: "You don`t have any token" },
      });
    }

    token.set(root.auth.token);

    try {
      const { data } = await axios.get("/auth/current");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authOperations = {
  register,
  login,
  googleAuth,
  logout,
  fetchCurrentUser,
};
