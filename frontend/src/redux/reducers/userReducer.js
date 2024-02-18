const initialState = {
  token: null,
  email: '',
  username: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        username: action.payload.username,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
