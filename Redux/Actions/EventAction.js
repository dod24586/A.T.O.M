// Card Event Payment
import { toastr } from "react-redux-toastr";
export const UnAuthEvent = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      let Currentdata = data;
      await firestore.set(`${data.place}/${data.order_id}`, { ...Currentdata });
      await firestore.set(`allCard/${data.order_id}`, {
        ...Currentdata,
        Success: false,
        Massage: "",
        type: "Event"
      });
    } catch (e) {
      ////console.log(e);
    }
  };
};
// Kisok Event Payment

export const kisokUnAuthEvent = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      let Currentdata = data;
      await firestore.set(`${data.place}/${data.order_id}`, { ...Currentdata });
      await firestore.set(`kisok${data.place}/${data.order_id}`, {
        ...Currentdata
      });
    } catch (e) {
      ////console.log(e);
    }
  };
};
var done = false;
var check = 0;

// Result Card
export const gettingResult = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      check++;
      var redirect = false;
      let Vip = db.collection("allCard").doc(`${data.order}`);
      Vip.get().then(async doc => {
        try {
          ///code

          let currentData = doc.data(); //all data inside collection
          let copyOfData = {
            ...currentData,
            Success: data.success,
            Massage: data.massage
          };
          if (data.success && currentData.type === "Event") {
            await firestore.set(`${currentData.place}Success/${data.order}`, {
              ...copyOfData
            });
            db.collection("allCard").doc(`${data.order}`).delete();
            db.collection(`${currentData.place}`).doc(`${data.order}`).delete();
            done = true;

            dispatch({ type: "PAYMENT_DONE", done, redirect });
          } else if (data.success && currentData.type === "Trip") {
            await firestore.set(`${copyOfData.data}/${data.order}`, {
              ...copyOfData
            });
            db
              .collection("users")
              .doc(currentData.userId)
              .get()
              .then(async doc => {
                let notifications = [...doc.data().notifications];
                let lastIndex = notifications.findIndex(x => {
                  return x.OrderId === data.order;
                });
                notifications[lastIndex] = {
                  ...notifications[lastIndex],
                  date: new Date(),
                  PendingPayment: true,
                  Massage: data.massage
                };
                await firestore.update(`users/${currentData.userId}`, {
                  notifications
                });
              });
            await db
              .collection("allCard")
              .doc(`${data.order}`)
              .delete()
              .then(() => {
                done = true;

                toastr.success("Booked Success");

                dispatch({ type: "PAYMENT_DONE", done, redirect });
              });
            /*  await db
              .collection(`${currentData.place}`)
              .doc(`${data.order}`)
              .delete()*/
          } else if (data.success === false && currentData.type === "Event") {
            /*await firestore.set(`${currentData.place}failed/${data.order}`, {
              ...copyOfData
            });*/
            db.collection("allCard").doc(`${data.order}`).delete().then(() => {
              done = true;

              dispatch({ type: "PAYMENT_DONE", done, redirect });
              toastr.error("Booked Failed");
            });
          } else if (data.success === false && currentData.type === "Trip") {
            /*await firestore.set(`${currentData.place}failed/${data.order}`, {
              ...copyOfData
            });*/
            db
              .collection("allCard")
              .doc(`${data.order}`)
              .delete()
              .then(async () => {
                db
                  .collection("users")
                  .doc(currentData.userId)
                  .get()
                  .then(async doc => {
                    let notifications = [...doc.data().notifications];
                    let lastIndex = notifications.findIndex(x => {
                      return x.OrderId === data.order;
                    });
                    notifications[lastIndex] = {
                      ...notifications[lastIndex],
                      date: new Date(),
                      PendingPayment: false,
                      Type: "Pending",
                      Massage: data.massage
                    };
                    await firestore.update(`users/${currentData.userId}`, {
                      notifications
                    });
                  });
                done = true;
                dispatch({ type: "PAYMENT_DONE", done, redirect });
                toastr.error("Booked Failed");
              });
          }
        } catch (e) {
          redirect = true;
          if (check > 0 && done) {
            done = false;
            check = 0;
          } else {
            dispatch({ type: "PAYMENT_DONE", done, redirect });
          }
        }
      });
    } catch (e) {}
  };
};
// secure payment result

export const securePaymentResult = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    //    const firestore = getFirestore();
    try {
      let Vip = await db.collection("allCard").doc(`${data.order}`);
      Vip.get().then(async doc => {
        try {
          ///code
          let currentData = doc.data(); //all data inside collection
          if (currentData) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          ///code
          ////console.log(e);
        }
      });
    } catch (e) {
      ////console.log(e);
    }
  };
};
