const initialState = {
  user: {
    username: '',
    dateOfBirth: null,
    email: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};

export { initialState, reducer };