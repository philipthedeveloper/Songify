import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./auth/login/login";
import accountReducer from "./account/account";

const store = configureStore({
  reducer: {
    Login: loginReducer,
    Account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
