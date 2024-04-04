import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// Auth trainer
export const postStreaksAdminLogin = (data: any) => {
  return api.create(url.POST_STREAKS_ADMIN_LOGIN, data);
};

export const postStreaksAdminRegister = (data: any) => {
  return api.create(url.POST_STREAKS_ADMIN_REGISTER, data);
};

export const getProfileDetails = () => {
  return api.get(url.GET_PROFILE_DETAILS);
};
