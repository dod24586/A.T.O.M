import { createStore, applyMiddleware } from "redux";
import rootReducers from "./RootReducer";
import thunk from "redux-thunk";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import firebase, { db } from ".././config/firebase";
import { composeWithDevTools } from "redux-devtools-extension";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

export const Store = () => {
  const store = createStore(
    rootReducers,
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument({ getFirebase, getFirestore, db })
      ),
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
    )
  );
  return store;
};
