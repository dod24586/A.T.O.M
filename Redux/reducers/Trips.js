const initialState = {
  done: false,
  redirect: false
};

const Trips = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENT_DONE":
      return { ...state, done: action.done, redirect: action.redirect };
    default:
      return state;
  }
};

export default Trips;
