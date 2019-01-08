import { combineReducers } from "redux";

import auth from "./authReducers";
import user from "./userReducers";

const rootReducer = combineReducers({
  auth,
  user
});

export default rootReducer;
