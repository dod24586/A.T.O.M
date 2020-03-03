const initialState = {
  Image: null,
  EditingProfile: false
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_SUCCESS":
      return { ...state };
    case "UPLOAD_ERROR":
      return { ...state };
    case "STARTEDITING_SUCCESS":
      return { ...state, EditingProfile: !state.EditingProfile };

    default:
      return state;
  }
};

export default ProfileReducer;
