import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

export const loginSuccess = (token) => {
  // console.log("token:", token);
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

export const logoutSuccess = () => {
  // console.log("token:", token);
  return {
    type: LOGOUT_SUCCESS,
    payload: "",
  };
};
