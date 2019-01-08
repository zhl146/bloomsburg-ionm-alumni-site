const defaultState = {
  loggedIn: true
};

export default (state = defaultState, action) => {
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
