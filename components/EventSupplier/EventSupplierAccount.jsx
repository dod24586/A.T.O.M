import React, { Component } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatingComponent from "react-star-rating-component";
import { Route, Switch, Redirect } from "react-router-dom";
import AllCurrentEvent from "./AllCurrentEvent";
import CreateTripForm from "./CreateTripForm";
import DataBox from "./DataBox";
import { compose } from "redux";
import { connect } from "react-redux";
import { storage } from "../../config/firebase";
import { UploadLogo } from "../../Redux/Actions/ProfileAction";
import { firestoreConnect } from "react-redux-firebase";
import Feedback from "./Feedback";
class EventSupplierAccount extends Component {
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
          ////console.log(error);
        },
        () => {
          // complete function ....
          storage.ref("images").child(image.name).getDownloadURL().then(url => {
            this.setState({ url });
            this.props.UploadImage(url);

            /*this.props.UploadImageToNav(url);
            this.props.ProfileImage(url, this.props.auth.uid);*/
          });
        }
      );
    }
  };
  render() {
    if (!this.props.Profile.isLoaded) return <div />;

    return (
      <div className="container containerXz emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="containerImage profile-img ">
                <img
                  src={
                    this.props.Profile.EventData.CompanyLogo !== ""
                      ? this.props.Profile.EventData.CompanyLogo
                      : "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
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

            <DataBox data={this.props.Profile} />
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
                  component={() =>
                    <AllCurrentEvent
                      data={this.props.allTrips}
                      dataReq={this.props.allTripsReq}
                      user={this.props.auth.uid}
                      handle={this.props.Profile.EventData}
                    />}
                  path="/EventSupplier/CurrentEvent"
                />
                <Route
                  component={() =>
                    <CreateTripForm
                      data={this.props.Profile.EventData}
                      TotalRate={this.props.Profile.EventData.allServices.find(
                        x => {
                          if (x.Name === "Trips") {
                            return x.Rate / x.TotalRate || 0;
                          }
                          return -1;
                        }
                      )}
                    />}
                  path="/EventSupplier/CreateTrip"
                />
                <Route
                  component={() =>
                    <Feedback data={this.props.Profile.EventData} />}
                  path="/EventSupplier/Feedback"
                />
                <Redirect />
              </Switch>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Profile: state.firebase.profile,
    auth: state.firebase.auth,
    Apply: state.Apply,
    Image: state,
    allUsers: state.firestore.ordered.users,
    allChatRoom: state.firestore.ordered.ChatRoom,
    allTrips: state.firestore.ordered.Trips,
    allTripsReq: state.firestore.ordered.TripsReq
  };
};
const mapDispatchToProps = dispatch => {
  return {
    /* ProfileImage: data => dispatch(ProfileImage(data)),
    UploadImageToNav: data => dispatch(getProps(data)),*/
    UploadImage: data => dispatch(UploadLogo(data))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "users" },
    { collection: "ChatRoom" },
    { collection: "TripsReq" },
    { collection: "Trips" }
  ])
)(EventSupplierAccount);
