import React, { Component } from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
class OnlinePayment extends Component {
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
          <Table data={this.props.data} ApplyType="Online Payment" />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.firestore.ordered.OnlinePayment
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "OnlinePayment" }])
)(OnlinePayment);
