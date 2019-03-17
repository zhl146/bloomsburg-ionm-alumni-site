const defaultState = {
  loggedIn: false
};

const setSession = (state, { idToken, idTokenPayload }) => ({
  ...state,
  idToken,
  profile: idTokenPayload,
  expiresAt: idTokenPayload.exp * 1000
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return setSession(state, action.payload);
    default:
      return state;
  }
};
