const initialState = {
  url: "",
  uid: "",
  ChatID: "",
  Name: "",
  AD: "",
  DisplayPopUp: false
};

const ApplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETPROPS_SUCCESS":
      return { ...state, url: action.getProps, uid: action.uid };
    case "GETPROPS_ERROR":
      return { ...state };
    case "GET_ID_SUCCESS":
      return {
        ...state,
        ChatID: action.id,
        Name: action.name,
        AD: action.xid,
        DisplayPopUp: !state.DisplayPopUp
      };

    default:
      return state;
  }
};

export default ApplyReducer;
