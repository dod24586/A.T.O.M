import React from "react";
import "./MyProfile.css";
import { NavLink } from "react-router-dom";
import "./DataBox.css";
import "../w3.css";
import StarRatingComponent from "react-star-rating-component";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataBox = props => {
  if (props.data.isEmpty) {
    return (
      <div className="col-md-8">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (props.data.Apply) {
  }

  return (
    <div className="col-md-8">
      <div
        className="profile-head"
        style={
          props.data.Apply && props.data.Apply
            ? { marginTop: "0px" }
            : { marginTop: "60px" }
        }
      >
        <h5 style={{ textAlign: "center" }}>
          {props.data.displayName}{" "}
        </h5>
        {props.data.Apply && props.data.Apply
          ? <div>
              <h6>
                {props.data.Website}
              </h6>
              <p className="proile-rating">
                <span>
                  <StarRatingComponent
                    name={props.data.displayName}
                    value={props.sendAvg}
                    starCount={5}
                    editing={false}
                  />
                </span>
              </p>
            </div>
          : <React.Fragment>
              <br />
              <br />
              <br />
            </React.Fragment>}

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              id="home-tab"
              data-toggle="tab"
              to="/Account/MyProfile"
              role="tab"
              style={{ display: "flex", padding: "10px" }}
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
              to="/Account/EditProfile"
              data-toggle="tab"
              role="tab"
              style={{ display: "flex", padding: "10px" }}
              aria-controls="profile"
              aria-selected="false"
            >
              Edit Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              id="profile-tab"
              to="/Account/Notification"
              data-toggle="tab"
              role="tab"
              style={{ display: "flex", padding: "13px" }}
              aria-controls="profile"
              aria-selected="false"
            >
              <FontAwesomeIcon icon={faBell} />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DataBox;
/* <div className="w3-card  w3-center">
            <div className="w3-white">
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/Profile">Profile</Link>
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/ForumPosts">Forum Posts</Link>
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/ForumComments">Forum Comments</Link>
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/MyProfile">My Profile</Link>
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/Notifications">Notifications</Link>
            <Link className="w3-bar-item w3-button w3-theme-l1 w3-left-align" to="/Settings">Settings</Link>
            </div>
            </div>*/
