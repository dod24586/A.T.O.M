import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import Trips from "./reducers/Trips";
import AuthReducer from "./reducers/AuthReducer";
import ApplyReducer from "./reducers/ApplyReducers";
import ProfileReducer from "./reducers/ProfileReducer";
import { reducer as ToastrReducer } from "react-redux-toastr";
const rootReducers = combineReducers({
  trips: Trips,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  Auth: AuthReducer,
  Apply: ApplyReducer,
  Profile: ProfileReducer,
  toastr: ToastrReducer
});

export default rootReducers;
