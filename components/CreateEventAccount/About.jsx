import React, { Component } from "react";
class About extends Component {
  render() {
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
              <p>{this.props.user.displayName}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Email</label>
            </div>
            <div className="col-md-6">
              <p>{this.props.user.email}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Phone</label>
            </div>
            <div className="col-md-6">
              <p>{this.props.user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
