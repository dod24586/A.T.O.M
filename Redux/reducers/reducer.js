const initialState = {
  isLogin: false,
  Name: null,
  img: ""
};

const Reducer = (state = initialState, action) => {
  //console.log(state);
  if (action.type === "ENABLE") {
    return { ...state, isLogin: !state.isLogin };
  }
  return state;
};

export default Reducer;
