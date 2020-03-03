import { toastr } from "react-redux-toastr";

export const ProfileImage = url => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      user.updateProfile({ photoURL: url }).then(function() {
        firestore.update(`users/${user.uid}`, {
          photoURL: url
        });
      });
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(doc => {
        try {
          ////console.log(doc.data().allServices);
          doc.data().allServices.map(x =>
            firestore.update(`${x.Name.replace(/ /g, "")}/${user.uid}`, {
              photoURL: url
            })
          );
        } catch (error) {
          ////console.log(error);
        }
      });

      userData = db.collection("users").doc(user.uid);
      userData.get().then(doc => {
        try {
          ////console.log(doc.data().AddFeedback);

          doc.data().AddFeedback.map(x => {
            db.collection("users").doc(x).get().then(doc => {
              ////console.log(doc.data());
              let Feedback = [...doc.data().Feedback];
              Feedback = Feedback.map(x => {
                ////console.log(x);
                let getUseruid = x.FeedbackBy.uid;
                if (getUseruid === user.uid) {
                  return { ...x, photo: url };
                } else return { ...x };
              });
              firestore.update(`users/${x}`, {
                Feedback: Feedback
              });
            });
            return true;
          });
        } catch (error) {
          ////console.log(error);
        }
      });

      toastr.success("Update Success");
    } catch (error) {
      ////console.log(error);
    }
  };
};

export const UploadLogo = url => async (
  dispatch,
  getState,
  { getFirebase, getFirestore, db }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  let user = firebase.auth().currentUser;

  try {
    db.collection("users").doc(user.uid).get().then(async doc => {
      let CompanyLogo = url;
      var EventData = {
        ...doc.data().EventData,
        CompanyLogo
      };
      //console.log(url, EventData);
      await firestore.update(`users/${user.uid}`, { EventData });
    });

    toastr.success("Updated Successfully");
  } catch (error) {
    ////console.log(error);
  }
};

export const EditingProfile = User => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  let user = firebase.auth().currentUser;
  //console.log(User);
  try {
    if (User.email !== "") {
      await user.updateEmail(User.email).then(function() {
        firestore.update(`users/${user.uid}`, {
          email: User.email
        });
      });
    }
    if (User.password !== "") {
      await user.updatePassword(User.password);
    }
    if (User.name !== "") {
      await user
        .updateProfile({ displayName: User.name })
        .then(async function() {
          await firestore.update(`users/${user.uid}`, {
            displayName: User.name
          });
          ////console.log("done");
        });
    }
    if (User.phone !== "") {
      await firestore.update(`users/${user.uid}`, {
        phone: User.phone
      });
      ////console.log("done");
    }
    toastr.success("Updated done");
    // dispatch({ type: "STARTEDITING_SUCCESS" });
  } catch (error) {
    //console.log(error);
    dispatch({ type: "STARTEDITING_ERROR", error });
  }
};
