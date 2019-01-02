import { combineReducers } from "redux";

const defaultState = {
  loggedIn: false
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
