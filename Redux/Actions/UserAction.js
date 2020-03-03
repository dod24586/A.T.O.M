import { toastr } from "react-redux-toastr";

export const UpdateProfile = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    await firebase.updateProfile(user);
    toastr.success("Updated Successfully");
  } catch (error) {
    ////console.log(error);
  }
};
