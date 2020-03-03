import React, { Component } from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
class BadegtingServices extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <div>
        <Redirect to="/ComingSoon" />
        <div Style="text-align:center">
          <img
            src={this.props.logo}
            alt="Atom"
            className="rounded mx-auto d-block image-1"
          />
        </div>
        <div className="w3-container" Style="    text-align: -webkit-center;">
          <Table data={this.props.data} ApplyType="Badegting Services" />
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    data: state.firestore.ordered.BadegtingServices
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "BadegtingServices" }])
)(BadegtingServices);
