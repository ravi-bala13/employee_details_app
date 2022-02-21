import { loadData } from "../utils/sessionStorage";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

const token = loadData("token");

const initState = {
  isAuth: false,
  token: token || "",
};

export const authReducer = (state = initState, { type, payload }) => {
  // console.log("state:", state);
  switch (type) {
    case LOGIN_SUCCESS:
      // console.log("payload:", payload);
      return {
        ...state,
        token: payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: payload,
      };

    default:
      return state;
  }
};
