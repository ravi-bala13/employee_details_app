import { authReducer } from "./reducer";
import { createStore } from "redux";

export const store = createStore(authReducer);
