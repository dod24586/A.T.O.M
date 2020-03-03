import { toastr } from "react-redux-toastr";

//                 Sign Up
export const SignUp = NewUser => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const CreatedUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(NewUser.Email, NewUser.Password1);
    ////console.log(CreatedUser);
    await CreatedUser.user.updateProfile({
      displayName: NewUser.FullName
    });
    let newUser = {
      displayName: NewUser.FullName,

      Supplier: false,
      email: NewUser.Email,
      phone: NewUser.Phone,
      notifications: [],
      Feedback: []
    };
    await firestore
      .set(`users/${CreatedUser.user.uid}`, { ...newUser })
      .then(() => {
        toastr.success(`Welcome ${NewUser.FullName}`);
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);
        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};

//                    Log In
export const Login = loginUser => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginUser.Email, loginUser.Password)
      .then(data => {
        ////console.log(data);
        toastr.success(`Welcome ${data.user.displayName}`);

        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};
//             Sign Out
export const SignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        toastr.success(`Sign out Success`);

        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SIGNOUT_ERROR", error });
      });
  };
};
//             Forget Password
export const UserForgetPassword = User => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(User)
      .then(() => {
        toastr.success("Please check your email");
        dispatch({ type: "USERFORGETPASSWORD_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);
        dispatch({ type: "USERFORGETPASSWORD_ERROR", error });
      });
  };
};
//Apply Sign Up
export const ApplySignUp = NewUser => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    /* let allServices = [...NewUser.checkbox];
    allServices = allServices.filter(x => {
      if (x.state === true) {
        return true;
      }
      return false;
    });*/

    const CreatedUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(NewUser.Email, NewUser.Password1);
    //console.log(NewUser);
    await CreatedUser.user.updateProfile({
      displayName: NewUser.Name
    });
    let newUser = {
      displayName: NewUser.Name /*|| NewUser.CompanyName*/,
      email: NewUser.Email,
      phone: NewUser.Phone,
      notifications: [],
      Supplier: true
    };
    await firestore
      .set(`users/${CreatedUser.user.uid}`, { ...newUser })
      /*.then(
        allServices.map(x =>
          firestore.set(`${x.Name.replace(/ /g, "")}/${CreatedUser.user.uid}`, {
            ...newUser
          })
        )
      )*/

      .then(async () => {
        let data = { ...NewUser, CreatedUser: CreatedUser.user.uid };
        // dispatch({ type: "SIGNUP_SUCCESS" }); const CreatedUser = data.CreatedUser;
        //console.log(CreatedUser);
        let Data = {
          Apply: false,
          Supplier: false,
          Check: false,
          Accept: false,
          displayName: data.CompanyName,
          Location: data.Location,
          BankName: data.BankName,
          BankAccountName: data.BankAccountName,
          BankAccountNumber: data.BankAccountNumber,
          SwiftCode: data.SwiftCode,
          TaxCardImage: data.TaxCardImage,
          Feedback: [],
          TaxCardNumber: data.TaxCardNumber,
          CommercialRegistration: data.CommercialRegistrationImage,
          CommercialRegistrationNumber: data.CommercialRegistrationNumber,
          Phone: data.Phone,
          Email: data.Email,
          Website: data.Website,
          CompanyLogo: "",
          error: null,
          allServices: [
            {
              Name: data.option1,
              Rate: 0,
              TotalRate: 0,
              AvgTime: data.time1 || 0,
              AvgPrice: data.price1 || 0
            },
            {
              Name: data.option2,
              Rate: 0,
              TotalRate: 0,
              AvgTime: data.time2 || 0,
              AvgPrice: data.price2 || 0
            },
            {
              Name: data.option2,
              Rate: 0,
              TotalRate: 0,
              AvgTime: data.time3 || 0,
              AvgPrice: data.price3 || 0
            }
          ]
        };

        await firestore
          .set(`EventSupplierReqest/${data.CreatedUser}`, { ...Data })
          .catch(error => {
            toastr.error(error.message);
          });
        let userData = db.collection("users").doc(data.CreatedUser);
        userData.get().then(async doc => {
          try {
            let notifications = [];
            if (doc.data().notifications === undefined) {
              notifications = [
                {
                  Name: "Be Event Supplier",
                  date: new Date(),
                  Type: "EventSupplier",
                  Check: false,
                  Accept: false
                }
              ];
              await firestore.set(
                `users/${data.CreatedUser}`,
                {
                  notifications
                },
                { merge: true }
              );
            } else {
              notifications = [
                ...doc.data().notifications,
                {
                  Name: "Be Event Supplier",
                  date: new Date(),
                  Type: "EventSupplier",
                  Check: false,
                  Accept: false
                }
              ];
              await firestore.update(`users/${data.CreatedUser}`, {
                notifications
              });
            }
          } catch (error) {
            toastr.error(error.message);
            ////console.log("catch 2");
          }
        });

        toastr.success(`Welcome ${NewUser.Name}`);
        toastr.success(`Thanks We Will Communicat With You Soon`);
        toastr.success("Check Your Notification Box");
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};
// Social Login
export const SocialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    firebase
      .login({
        provider: selectedProvider,
        type: "popup"
      })
      .then(data => {
        toastr.success(`Welcome ${data.user.displayName}`);

        dispatch({ type: "SOCIALLOGIN_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SOCIALLOGIN_ERROR", error });
      });
  };
};
// Update Password
export const UpdatePassword = User => {
  return async (dispatch, getState, { getFirebase, db }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    await user
      .updatePassword(User.password1)
      .then(() => {
        toastr.success("Password Updated Success");

        dispatch({ type: "UPDATEPASSWORD_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "UPDATEPASSWORD_ERROR", error });
      });
  };
};
// Event Supplier Form
export const EventSupplierForm = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let CreatedUser;
    if (data.CreatedUser) {
      CreatedUser = data.CreatedUser;
    } else {
      CreatedUser = await firebase.auth().currentUser.uid;
    }

    let Data = {
      Apply: false,
      Supplier: false,
      Check: false,
      Accept: false,
      displayName: data.CompanyName,
      Location: data.Location,
      BankName: data.BankName,
      BankAccountName: data.BankAccountName,
      BankAccountNumber: data.BankAccountNumber,
      SwiftCode: data.SwiftCode,
      TaxCardImage: data.TaxCardImage,
      Feedback: [],
      TaxCardNumber: data.TaxCardNumber,
      CommercialRegistrationImage: data.CommercialRegistrationImage,
      CommercialRegistrationNumber: data.CommercialRegistrationNumber,
      Phone: data.Phone,
      Email: data.Email,
      Website: data.Website,
      CompanyLogo: "",
      error: null,
      allServices: [
        {
          Name: data.option1,
          Rate: 0,
          TotalRate: 0,
          AvgTime: data.time1 || 0,
          AvgPrice: data.price1 || 0
        },
        {
          Name: data.option2,
          Rate: 0,
          TotalRate: 0,
          AvgTime: data.time2 || 0,
          AvgPrice: data.price2 || 0
        },
        {
          Name: data.option2,
          Rate: 0,
          TotalRate: 0,
          AvgTime: data.time3 || 0,
          AvgPrice: data.price3 || 0
        }
      ]
    };
    /*displayName: data.CompanyName,
    Website: data.Website,
    CompanyLogo:"",
    email: data.Email,
    phone: data.Phone,
    Name: "",*/
    await firestore
      .set(`EventSupplierReqest/${CreatedUser}`, { ...Data })
      .then(() => {
        toastr.success(`Thanks We Will Communicat With You Soon`);
      })
      .catch(error => {
        toastr.error(error.message);
      });
    await firestore.update(`users/${CreatedUser}`, { Supplier: true });
    let userData = db.collection("users").doc(CreatedUser);
    userData.get().then(async doc => {
      try {
        let notifications = [];
        if (doc.data().notifications === undefined) {
          notifications = [
            {
              Name: "Be Event Supplier",
              date: new Date(),
              Type: "EventSupplier",
              Check: false,
              Accept: false
            }
          ];
          await firestore.set(
            `users/${CreatedUser}`,
            {
              notifications
            },
            { merge: true }
          );
        } else {
          notifications = [
            ...doc.data().notifications,
            {
              Name: "Be Event Supplier",
              date: new Date(),
              Type: "EventSupplier",
              Check: false,
              Accept: false
            }
          ];
          await firestore
            .update(`users/${CreatedUser}`, { notifications })
            .then(() => toastr.success("Check Your Notification Box"));
        }
      } catch (error) {
        toastr.error(error.message);
        ////console.log("catch 2");
      }
    });
  };
};
