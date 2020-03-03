import { toastr } from "react-redux-toastr";
export const Feedback = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    let userData = db.collection("users").doc(data.uid);
    userData.get().then(async doc => {
      try {
        let checkUser = doc.data().Feedback.filter(x => {
          if (x.FeedbackBy.uid === user.uid) {
            if (x.Services === data.Feild) {
              return true;
            }
            return false;
          } else {
            return false;
          }
        });

        if (checkUser.length === 0) {
          const dataGot = {
            Services: data.Feild,
            Feedback: data.Feedback,
            Rate: data.Rate,
            date: new Date(),
            FeedbackBy: {
              uid: user.uid,
              photo: user.photoURL,
              displayName: user.displayName
            }
          };
          let newFeedback = [...doc.data().Feedback, dataGot];
          await firestore.update(`users/${data.uid}`, {
            Feedback: newFeedback
          });
          let allServicesInFireStore = [...doc.data().allServices];
          allServicesInFireStore = allServicesInFireStore.map(x => {
            if (x.Name === data.Feild) {
              let FeedBack = [
                ...x.FeedBack,
                { Feedback: data.Feedback, photo: user.photoURL }
              ];
              let Rate = x.Rate + data.Rate;
              let TotalRate = ++x.TotalRate;
              return { ...x, FeedBack, Rate, TotalRate };
            }
            return { ...x };
          });
          await firestore.update(`users/${data.uid}`, {
            allServices: allServicesInFireStore
          });
          await firestore.update(
            `${data.Feild.replace().replace(/ /g, "")}/${data.uid}`,
            { allServices: allServicesInFireStore }
          );

          db.collection("users").doc(user.uid).get().then(async doc => {
            if (doc.data().AddFeedback === undefined) {
              await firestore.update(`users/${user.uid}`, {
                AddFeedback: [data.uid]
              });
            } else {
              await firestore.update(`users/${user.uid}`, {
                AddFeedback: [...doc.data().AddFeedback, data.uid]
              });
            }
          });

          toastr.success("Thanks for your Feedback");
        } else {
          toastr.error("You gived your Rate and Feedback before");
        }
      } catch (error) {
        toastr.error(error.message);
      }
    });
  };
};
export const SendContact = (data, ApplyId, MoreData) => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    try {
      let userData = db.collection("users").doc(ApplyId);
      userData.get().then(async doc => {
        try {
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                Services: data.Feild,
                Type: "Services",
                Description: data.WhatYouWant,
                email: data.email,
                phone: data.phone,
                userId: user.uid,
                Name: user.displayName
              }
            ];
            await firestore.set(
              `users/${ApplyId}`,
              { notifications },
              { merge: true }
            );
          } else {
            notifications = [
              ...doc.data().notifications,
              {
                date: new Date(),
                Services: data.Feild,
                Type: "Services",
                Description: data.WhatYouWant,
                email: data.email,
                phone: data.phone,
                userId: user.uid,
                Name: user.displayName
              }
            ];
            await firestore
              .update(`users/${ApplyId}`, { notifications })
              .then(() => toastr.success("Sended"));
          }
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 1");
        }
      });
      //////************************************************************************ */
      userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                Services: data.Feild,
                Type: "AskForServices",
                Description: data.WhatYouWant,
                email: data.email,
                phone: data.phone,
                ApplyId,
                Name: MoreData.displayName
              }
            ];
            await firestore.set(
              `users/${user.uid}`,
              {
                notifications
              },
              { merge: true }
            );
          } else {
            notifications = [
              ...doc.data().notifications,
              {
                date: new Date(),
                Services: data.Feild,
                Type: "AskForServices",
                Description: data.WhatYouWant,
                email: data.email,
                phone: data.phone,
                ApplyId,
                Name: MoreData.displayName
              }
            ];
            await firestore
              .update(`users/${user.uid}`, { notifications })
              .then(() => toastr.success("Check Your Notification Box"));
          }
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const Acception = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      //////************************************************************************ */
      //    Company
      let notificationsOut, IndexOut;

      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          let notifications = [...doc.data().notifications];
          let Index = notifications.findIndex(x => {
            return x.userId === data.userId;
          });
          notifications[Index].Check = true;
          notifications[Index].Accept = data.Accept;
          notifications[Index].ChatRoomId =
            user.uid +
            new Date().getDay() +
            new Date().getMonth() +
            new Date().getFullYear() +
            data.userId;
          notificationsOut = notifications;
          IndexOut = Index;
          await firestore
            .update(`users/${user.uid}`, { notifications })
            .then(() => toastr.success("Check Your Notification Box"));
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
      userData = db.collection("users").doc(data.userId);
      userData.get().then(async doc => {
        try {
          let notifications = [...doc.data().notifications];
          let index = doc.data().notifications.findIndex(x => {
            return (
              x.Services === notificationsOut[IndexOut].Services &&
              x.ApplyId === user.uid
            );
          });
          notifications[index].Check = true;
          notifications[index].Accept = data.Accept;
          notifications[index].ChatRoomId =
            user.uid +
            new Date().getDay() +
            new Date().getMonth() +
            new Date().getFullYear() +
            data.userId;

          /*notifications = [
              ...doc.data().notifications,
              {
                date: new Date(),
                Services: data.Feild,
                Type: "Services",
                Description: data.WhatYouWant,
                email: data.email,
                phone: data.phone,
                userId: user.uid
              }
            ];*/
          await firestore
            .update(`users/${data.userId}`, { notifications })
            .then(() => toastr.success("Sended "));
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 1");
        }
        await firestore.set(
          `ChatRoom/${user.uid +
            new Date().getDay() +
            new Date().getMonth() +
            new Date().getFullYear() +
            data.userId}`,
          { data: [] }
        );
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const sendChatId = (id, name, xid) => {
  return dispatch => {
    try {
      dispatch({ type: "GET_ID_SUCCESS", id, name, xid });
    } catch (error) {
      dispatch({ type: "GET_ID_ERROR", error });
    }
  };
};

export const sendMassages = (data, RoomId) => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      //////************************************************************************ */
      //    Company
      let userData = db.collection("ChatRoom").doc(RoomId);
      userData.get().then(async doc => {
        try {
          let object = { id: user.uid, massage: data };
          let info = [...doc.data().data];
          info.push(object);
          await firestore.update(`ChatRoom/${RoomId}`, { data: info });
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const AddNotifications = () => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          var AddNotifications = {
            ...doc.data(),
            notifications: []
          };

          await firestore.set(`users/${user.uid}`, { ...AddNotifications });
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const RemoveNotification = (data, ChatData) => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          var RemoveNotification = {
            notifications: [...data]
          };

          await firestore.update(`users/${user.uid}`, {
            ...RemoveNotification
          });
          if (ChatData.length > 0) {
            ChatData.map(id => db.collection("users").doc(`${id}`).delete());
          }
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const UpdateNotification = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    //console.log(data);
    try {
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          let x = doc
            .data()
            .notifications.findIndex(d => d.Type === "EventSupplier");

          var notifications = [...doc.data().notifications];
          notifications[x] = { data, click: true };
          //console.log(notifications);

          await firestore.update(`users/${user.uid}`, {
            ...notifications
          });
          toastr.success("done");
        } catch (error) {
          toastr.error(error.message);
          ////console.log("catch 2");
        }
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};

export const BecomeEventSupplier = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        db
          .collection("EventSupplierReqest")
          .doc(user.uid)
          .get()
          .then(async doc2 => {
            try {
              var EventSupplier = {
                ...doc.data(),
                EventData: { ...doc2.data() }
              };
              await firestore.set(`users/${user.uid}`, { ...EventSupplier });
              db.collection("EventSupplierReqest").doc(user.uid).delete();
            } catch (error) {
              toastr.error(error.message);
            }
          });
      });
      //console.log(data);
      let allNotifications = data.filter(data => {
        if (data.Type === "EventSupplier") {
          return false;
        } else {
          return true;
        }
      });
      var RemoveNotification = {
        notifications: [...allNotifications]
      };
      //console.log(RemoveNotification);
      await firestore.update(`users/${user.uid}`, {
        ...RemoveNotification
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
export const RefuseEventSupplier = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    try {
      await firestore.update(`users/${user.uid}`, { Supplier: false });
      db.collection("EventSupplierReqest").doc(user.uid).delete();
      let allNotifications = data.filter(data => {
        if (data.Type === "EventSupplier") {
          return false;
        } else {
          return true;
        }
      });
      var RemoveNotification = {
        notifications: [...allNotifications]
      };
      //console.log(RemoveNotification);
      await firestore.update(`users/${user.uid}`, {
        ...RemoveNotification
      });
    } catch (error) {
      toastr.error(error.message);
      ////console.log("catch 3");
    }
  };
};
