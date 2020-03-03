import { toastr } from "react-redux-toastr";
export const BookingTrip = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    //console.log("Trips Action:", data);
    try {
      const ApplierForTrip = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone,
        OrderId: data.order_id,
        numberOfTickets: data.number,
        price: data.price / 100,
        data: data.data.id,
        Success: false,
        location: data.location,
        Massage: "",
        Xid: data.data.Xid,
        type: data.type,
        userId: user.uid,
        tripName: data.data.Name + data.data.Place
      };
      await firestore.set(`allCard/${data.order_id}`, {
        ...ApplierForTrip
      });
      /* await firestore.set(
        `${data.data.Name + "" + data.data.Place+""+data.data.Xid}/${data.order_id}`,
        {
          ...ApplierForTrip
        }
      );*/
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                PendingPayment: false,
                Type: "Pending",
                Name: data.data.Name,
                OrderId: data.order_id,
                EndTime: Date.parse(new Date(data.data.EndTime)),
                Feedback: false,
                Place: data.data.Place,
                userId: user.uid,
                TripsId: data.data.id,
                Xid: data.data.Xid
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
                PendingPayment: false,
                Type: "Pending",
                Name: data.data.Name,
                OrderId: data.order_id,
                Place: data.data.Place,
                EndTime: Date.parse(new Date(data.data.EndTime)),
                Feedback: false,
                TripsId: data.data.id,
                Xid: data.data.Xid
              }
            ];
            //console.log(notifications);

            await firestore.update(`users/${user.uid}`, { notifications });
          }
        } catch (error) {
          toastr.error(error.message);
        }
      });
    } catch (error) {
      toastr.error(error.message);
    }
  };
};
export const KisokBookingTrip = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    ////console.log("Trips Action:", data);
    try {
      const ApplierForTrip = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone,
        OrderId: data.order_id,
        numberOfTickets: data.number,
        price: data.number * data.price,
        bill: data.bill,
        Success: false,
        Massage: ""
      };
      //console.log(ApplierForTrip);
      await firestore.set(
        `${data.data.Name + "" + data.data.Place}/${data.order_id}`,
        {
          ...ApplierForTrip
        }
      );
      await firestore.set(
        `kisok${data.data.Name + "" + data.data.Place}/${data.order_id}`,
        {
          ...ApplierForTrip
        }
      );
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          ////console.log(doc.data());
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                OrderId: data.order_id,
                PendingPayment: true,
                Type: "Pending",
                firstName: data.firstname,
                Place: data.place,
                TripsId: data.id
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
            //console.log("here");
            notifications = [
              ...doc.data().notifications,
              {
                date: new Date(),
                PendingPayment: true,
                Type: "Pending",
                Name: data.data.Name,
                Place: data.data.Place,
                TripsId: data.data.id
              }
            ];
            await firestore
              .update(`users/${user.uid}`, { notifications })
              .then(() => toastr.success("Booked Success"));
          }
        } catch (error) {
          toastr.error(error.message);
        }
      });
    } catch (error) {
      toastr.error(error.message);
    }
  };
};

export const CreateTrip = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    try {
      let ref = db.collection("TripsReq").doc();
      const Trip = {
        Check: false,
        Accept: false,
        Name: data.Company,
        Place: data.Location,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        Price: data.Price,
        Rate: data.Rate,
        Images: data.Images,
        Description: data.Description,
        Xid: user.uid
      };
      //console.log(data, Trip);
      await firestore.set(`TripsReq/${ref.id}`, { ...Trip });
    } catch (error) {
      toastr.error(error.message);
    }
  };
};

export const ConvertToTirps = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    //  const firebase = getFirebase();
    const firestore = getFirestore();
    //let user = firebase.auth().currentUser;
    try {
      const Trip = {
        Name: data.Name,
        Place: data.Place,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        Price: data.Price,
        Rate: data.Rate,
        Images: data.Images,
        Description: data.Description,
        Xid: data.Xid
      };

      // let ref = db.collection("TripsReq").doc();
      await firestore.set(`Trips/${data.id}`, { ...Trip });
      db.collection("TripsReq").doc(data.id).delete();
    } catch (error) {
      toastr.error(error.message);
    }
  };
};

export const SendFeedback = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    try {
      //console.log(data);
      //const Feedback = { Feedback: data.Feedback, Rate: data.Rate };
      await db.collection("users").doc(user.uid).get().then(async doc => {
        //console.log(doc.data());
        let notificationIndex = doc
          .data()
          .notifications.findIndex(x => x.OrderId === data.notifiData.OrderId);
        var notifications = doc.data().notifications;
        notifications[notificationIndex] = {
          ...notifications[notificationIndex],
          Feedback: true
        };
        await firestore.update(`users/${user.uid}`, {
          notifications
        });
      });
      await db
        .collection("users")
        .doc(data.notifiData.Xid)
        .get()
        .then(async doc => {
          //console.log(doc.data());
          let Feedback = doc.data().EventData.Feedback;
          Feedback = [
            ...Feedback,
            {
              type: "Trips",
              Feedback: data.Feedback,
              Rate: data.Rate,
              TripName: data.notifiData.Name + " " + data.notifiData.Place
            }
          ];
          let allServices = doc.data().EventData.allServices;
          //console.log(allServices);
          let index = doc
            .data()
            .EventData.allServices.findIndex(x => x.Name === "Trips");
          allServices[index] = {
            ...allServices[index],
            TotalRate: ++allServices[index].TotalRate,
            Rate: (allServices[index].Rate += data.Rate)
          };

          let EventData = doc.data().EventData;
          EventData = { ...EventData, allServices, Feedback };
          //console.log(EventData);
          await firestore.update(`users/${data.notifiData.Xid}`, {
            EventData
          });
        });
    } catch (e) {
      //console.log(e);
    }
  };
};

/* let x = await firestore.pu("Trips", {
      });*/
/* let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          ////console.log(doc.data());
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                PendingPayment: true,
                Type: "Pending",
                Name: data.data.Name,
                Place: data.data.Place,
                TripsId: data.data.id
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
                PendingPayment: true,
                Type: "Pending",
                Name: data.data.Name,
                Place: data.data.Place,
                TripsId: data.data.id
              }
            ];
            await firestore
              .update(`users/${user.uid}`, { notifications })
              .then(() => toastr.success("Booked Success"));
          }
        } catch (error) {
          toastr.error(error.message);
        }
      });*/
