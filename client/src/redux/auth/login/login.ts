import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postStreaksAdminLogin } from "../../../api";
import { setAuthorization } from "../../../api/apiCore";
import { LoginUserResponse, LoginData } from "./interface";

export interface LoginState {
  isLoggedIn: boolean;
  isLoginReqLoading: boolean;
  loginError: string;
  message: string;
}

const INIT_STATE: LoginState = {
  isLoggedIn: false,
  isLoginReqLoading: false,
  loginError: "",
  message: "",
};

// Login request thunk
export const loginUser = createAsyncThunk(
  "@@auth/loginUser",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = (await postStreaksAdminLogin(
        data
      )) as unknown as LoginUserResponse;
      if (response.success === true) {
        setAuthorization(response.accessToken);
        sessionStorage.setItem("authUser", JSON.stringify(response));
        sessionStorage.setItem("accessToken", response.accessToken);
      }
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk("@@auth/logoutUser", async () => {
  sessionStorage.removeItem("authUser");
  sessionStorage.removeItem("accessToken");
  return "done";
});

const loginSlice = createSlice({
  name: "Login",
  initialState: INIT_STATE,
  reducers: {
    resetLoginState: (state: LoginState) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.loginError = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: LoginState, action) => {
      state.isLoginReqLoading = true;
      state.isLoggedIn = false;
      state.loginError = "";
      state.message = "";
    });

    builder.addCase(loginUser.fulfilled, (state: LoginState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = true;
      state.message = action.payload as string;
      state.loginError = "";
    });

    builder.addCase(loginUser.rejected, (state: LoginState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.message = "";
      state.loginError = action.payload as string;
    });

    builder.addCase(logoutUser.fulfilled, (state: LoginState, action) => {
      state.isLoggedIn = false;
      state.isLoginReqLoading = false;
    });
  },
});

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
