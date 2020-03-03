import React, { Component } from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
class WebApp extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <div>
        {" "}
        <Redirect to="/ComingSoon" />
        <div Style="text-align:center">
          <img
            src={this.props.logo}
            alt="Atom"
            className="rounded mx-auto d-block image-1"
          />
        </div>
        <div className="w3-container" Style="    text-align: -webkit-center;">
          <Table data={this.props.data} ApplyType="Web App" />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    data: state.firestore.ordered.WebApp
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "WebApp" }])
)(WebApp);
