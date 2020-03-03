import React, { Component } from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
class DayUse extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <div>
        <Redirect to="/ComingSoon" />

        <div className="w3-container" Style="    text-align: -webkit-center;">
          <Table data={this.props.data} ApplyType="Day Use" />
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    data: state.firestore.ordered.DayUse
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "DayUse" }])
)(DayUse);
