const defaultState = {
  userProfiles: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return {
        ...state,
        userProfiles: action.payload
      }
    default:
    return state
  }
}