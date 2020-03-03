import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class BecomeAnUsher extends Component {
  state = {};
  render() {
    if (!this.props.auth.uid) return <Redirect to="/Login" />;
    return (
      <div>
        <h1 style={{ textAlign: "center", color: "#fff" }}>Coming Soon</h1>
      </div>
    );
  }
}
const mapState = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapState)(BecomeAnUsher);
