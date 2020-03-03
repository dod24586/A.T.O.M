import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink, Switch, Route } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Feedback from "./Feedback";
import About from "./About";
import AddFeedBack from "./AddFeedBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Contact from "./Contact";

class CreateEventAccount extends Component {
  state = {
    data: null,
    showPopup: false
  };
  togglePopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/Login" />;
    }
    let users = this.props.location.data || this.props.users;
    if (users) {
      users = users.find(x => {
        return this.props.match.params.id === x.id && x.allServices;
      });
      if (users === undefined) {
        return <Redirect to="/NotFound" />;
      }

      const Avg = users.allServices.map(x => {
        return x.TotalRate ? x.Rate / x.TotalRate : 0;
      });

      let max = Math.max(...Avg);
      return (
        <div className="container emp-profile">
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="containerImage profile-img ">
                  <img
                    src={
                      users.photoURL ||
                      "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                    }
                    alt={users.displayName}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="profile-head">
                  <h5>
                    {users.displayName}{" "}
                  </h5>

                  {
                    <div>
                      <h6>
                        {users.Website}
                      </h6>
                      <p className="proile-rating">
                        <span>
                          <StarRatingComponent
                            name={users.displayName}
                            value={max}
                            starCount={5}
                            editing={false}
                          />
                        </span>
                      </p>
                    </div>
                  }

                  {
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          id="home-tab"
                          data-toggle="tab"
                          to={`/MakeEvent/Account/${this.props.match.params
                            .id}/About`}
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          About
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          id="profile-tab"
                          to={`/MakeEvent/Account/${this.props.match.params
                            .id}/Feedback`}
                          data-toggle="tab"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Feedback
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          id="profile-tab"
                          to={`/MakeEvent/Account/${this.props.match.params
                            .id}/Contact`}
                          data-toggle="tab"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          <FontAwesomeIcon icon={faPhoneAlt} />
                        </NavLink>
                      </li>
                    </ul>
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>His Services</p>{" "}
                  <ul style={{ padding: 0 }}>
                    {users.allServices &&
                      users.allServices.map((x, index) => {
                        return (
                          <li key={index}>
                            <small>
                              {x.Name}
                            </small>
                            <div>
                              <StarRatingComponent
                                name={x.Name}
                                value={
                                  x.TotalRate === 0 ? 0 : x.Rate / x.TotalRate
                                }
                                starCount={5}
                                editing={false}
                              />
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <Switch>
                  <Route
                    component={() =>
                      <Contact
                        user={users}
                        ApplyId={this.props.match.params.id}
                      />}
                    path={`/MakeEvent/Account/${this.props.match.params
                      .id}/Contact`}
                  />
                  <Route
                    component={() =>
                      <Feedback
                        popUp={this.togglePopup}
                        currentUser={this.props.auth.uid}
                        user={users}
                        showPopup={this.state.showPopup}
                      />}
                    path={`/MakeEvent/Account/${this.props.match.params
                      .id}/Feedback`}
                  />
                  <Route
                    component={() => <About user={users} />}
                    path={`/MakeEvent/Account/${this.props.match.params
                      .id}/About`}
                  />
                </Switch>
              </div>
            </div>
          </form>
          {this.state.showPopup
            ? <AddFeedBack closePopup={this.togglePopup} user={users} />
            : null}
        </div>
      );
    } else {
      return <div style={{ textAlign: "center", color: "red" }}>Loading</div>;
    }
  }
}
const mapStateToProps = state => {
  ////console.log(state);
  return {
    Profile: state.firebase.profile,
    auth: state.firebase.auth,
    Apply: state.Apply,
    users: state.firestore.ordered.users
  };
};
/*const mapDispatchToProps = dispatch => {
  return {
    ProfileImage: data => dispatch(ProfileImage(data))
  };
};
*/
export default compose(
  connect(
    mapStateToProps
    //mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(CreateEventAccount);
/*      <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="containerImage profile-img ">
                <img
                  src={
                    this.props.auth.photoURL ||
                    "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user.displayName} </h5>

                <div>
                  <h6>{user.Website}</h6>
                  <p className="proile-rating">
                    <span>
                      <StarRatingComponent
                        name={user.displayName}
                        value={2}
                        starCount={5}
                        editing={false}
                      />
                    </span>
                  </p>
                </div>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      to="/Account/MyProfile"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="profile-tab"
                      to="/Account/ChangePassword"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Change Password
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <Link>
                <input
                  type="submit"
                  className="profile-edit-btn"
                  name="btnAddMore"
                  value="Edit Profile"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>{" "}
                <ul style={{ padding: 0 }}>
                  {user.allServices &&
                    user.allServices.map((x, index) => {
                      return (
                        <li key={index}>
                          <small>{x.Name}</small>
                          <div>
                            <StarRatingComponent
                              name={x.Name}
                              value={2}
                              starCount={5}
                              editing={false}
                            />
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.Email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.Phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="containerImage profile-img ">
                <img
                  src={
                    this.props.auth.photoURL ||
                    "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user.displayName} </h5>

                <div>
                  <h6>{user.Website}</h6>
                  <p className="proile-rating">
                    <span>
                      <StarRatingComponent
                        name={user.displayName}
                        value={2}
                        starCount={5}
                        editing={false}
                      />
                    </span>
                  </p>
                </div>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      to="/Account/MyProfile"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="profile-tab"
                      to="/Account/ChangePassword"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Change Password
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <Link>
                <input
                  type="submit"
                  className="profile-edit-btn"
                  name="btnAddMore"
                  value="Edit Profile"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>{" "}
                <ul style={{ padding: 0 }}>
                  {user.allServices &&
                    user.allServices.map((x, index) => {
                      return (
                        <li key={index}>
                          <small>{x.Name}</small>
                          <div>
                            <StarRatingComponent
                              name={x.Name}
                              value={2}
                              starCount={5}
                              editing={false}
                            />
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.displayName}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.Email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.Phone}</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </form>
      </div>*/
