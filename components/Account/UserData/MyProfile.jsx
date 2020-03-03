import React from "react";
import ".././MyProfile.css";
import { storage } from "../../../config/firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { ProfileImage } from "./../../../Redux/Actions/ProfileAction";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import { getProps } from "../../../Redux/Actions/ApplyaAction";
import DataBox from "./../DataBox";
import EditProfile from "./EditProfile";
import Notifications from "./Notifications";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class MyProfile extends React.Component {
  state = { image: null, url: "", progress: 0 };
  handlingChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );
          this.setState({ progress });
        },
        error => {
          // error function ....
          //////console.log(error);
        },
        () => {
          // complete function ....
          storage.ref("images").child(image.name).getDownloadURL().then(url => {
            this.setState({ url });
            this.props.UploadImageToNav(url);
            this.props.ProfileImage(url, this.props.auth.uid);
          });
        }
      );
    }
  };
  render() {
    if (!this.props.auth.uid) return <Redirect to="/Login" />;
    if (this.props.Profile.Apply) {
      const Avg = this.props.Profile.allServices.map(x => {
        return x.TotalRate ? x.Rate / x.TotalRate : 0;
      });
      var sendAvg = Math.max(...Avg);
    }
    ////console.log(this.props);

    return (
      <div className="container containerXz emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="containerImage profile-img ">
                <img
                  src={
                    this.props.Apply.uid === this.props.auth.uid
                      ? this.props.Apply.uid
                      : this.props.auth.photoURL ||
                        "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                  }
                  alt={this.props.auth.displayName}
                />
                <div className="file btn btn-lg btn-primary content">
                  <FontAwesomeIcon icon={faCamera} />{" "}
                  <input
                    type="file"
                    name="file"
                    onChange={this.handlingChangeImage}
                  />
                </div>
              </div>
            </div>

            <DataBox data={this.props.Profile} sendAvg={sendAvg} />
          </div>
          <div className="row">
            <div className="col-md-4">
              {this.props.Profile.Apply && this.props.Profile.Apply
                ? <div className="profile-work">
                    <p>Your Applyed Services</p>{" "}
                    <ul style={{ padding: 0 }}>
                      {this.props.Profile.allServices &&
                        this.props.Profile.allServices.map((x, index) => {
                          return (
                            <li key={index}>
                              <small>
                                {x.Name}
                              </small>
                              <div>
                                <StarRatingComponent
                                  name={x.Name}
                                  value={x.Rate / x.TotalRate}
                                  starCount={5}
                                  editing={false}
                                />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                : null}
            </div>
            <div className="col-md-8">
              <Switch>
                <Route
                  component={() => <Profile data={this.props.Profile} />}
                  path="/Account/MyProfile"
                />
                <Route
                  component={() => <EditProfile data={this.props.Profile} />}
                  path="/Account/EditProfile"
                />

                <Route
                  component={() =>
                    <Notifications
                      data={this.props.Profile}
                      moreData={this.props.check}
                      path="/Account/Notification"
                      allUsers={this.props.allUsers}
                      UserID={this.props.auth.uid}
                      allChatRoom={this.props.allChatRoom}
                    />}
                  path="/Account/Notification"
                />
              </Switch>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let check =
    state.firestore.ordered.EventSupplierReqest &&
    state.firestore.ordered.EventSupplierReqest.find(x => {
      return state.firebase.auth.uid === x.id;
    });
  let notifications;
  if (state.firebase.profile.notifications)
    notifications = state.firebase.profile.notifications;

  return {
    notifications,
    Profile: state.firebase.profile,
    auth: state.firebase.auth,
    Apply: state.Apply,
    Image: state,
    allUsers: state.firestore.ordered.users,
    allChatRoom: state.firestore.ordered.ChatRoom,
    check
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ProfileImage: data => dispatch(ProfileImage(data)),
    UploadImageToNav: data => dispatch(getProps(data))
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "EventSupplierReqest" },
    { collection: "users" },
    { collection: "ChatRoom" }
  ])
)(MyProfile);
