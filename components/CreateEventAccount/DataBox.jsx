import React from "react";
import { Link } from "@reach/router";
import "./DataBox.css";
import "../w3.css";

const DataBox = props => {
  return (
    <div>
      <div className="profile-usermenu">
        <ul className="nav">
          <Link to="/AllEvent" className=" w3-block">
            All Event
          </Link>
          <Link to="/Trips" className=" w3-block">
            Trips
          </Link>
          <Link to="/Wedding" className=" w3-block">
            Wedding
          </Link>
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
