const initialState = {
  AuthError: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNOUT_SUCCESS":
      return { ...state };
    case "SIGNOUT_ERROR":
      return { ...state, AuthError: action.error.message };
    case "LOGIN_SUCCESS":
      return { ...state };
    case "LOGIN_ERROR":
      //console.log(action.error);
      return { ...state, AuthError: action.error.message };
    case "SIGNUP_SUCCESS":
      return { ...state };
    case "SIGNUP_ERROR":
      return { ...state, AuthError: action.error.message };
    case "USERFORGETPASSWORD_SUCCESS":
      return { ...state };
    case "USERFORGETPASSWORD_ERROR":
      return { ...state, AuthError: action.error.message };
    default:
      return state;
  }
};

export default AuthReducer;
