import React, { Component } from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
class Wedding extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <div>
        {" "}<div Style="text-align:center">
          <img
            src={this.props.logo}
            alt="Atom"
            className="rounded mx-auto d-block image-1"
          />
        </div>
        <div className="w3-container" Style="    text-align: -webkit-center;">
          <Table data={this.props.data} ApplyType="Wedding" />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.firestore.ordered.Wedding
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "Wedding" }])
)(Wedding);
