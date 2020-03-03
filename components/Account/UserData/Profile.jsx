import React from "react";

const Profile = props => {
  return (
    <div className="tab-content profile-tab" id="myTabContent">
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
          </div>
          <div className="col-md-6">
            <p>{props.data.displayName}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Email</label>
          </div>
          <div className="col-md-6">
            <p>{props.data.email || props.data.Email}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Phone</label>
          </div>
          <div className="col-md-6">
            <p>{props.data.phone || "Add Your Phone Number"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
