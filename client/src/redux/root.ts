import { AccountState } from ".";
import { LoginState } from "./auth/login/login";

export interface StoreInterface {
  Login: LoginState;
  Account: AccountState;
}

export type RootState = {
  Login: StoreInterface["Login"];
  Account: StoreInterface["Account"];
};
