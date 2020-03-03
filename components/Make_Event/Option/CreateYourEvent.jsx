import React from "react";
import Table from "../table";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class CreateYourEvent extends React.Component {
  state = {
    data: [
      {
        logo: this.props.logo,
        Name: "Atom-1",
        Price: Math.floor(Math.random() * 101),
        Rate: Math.floor(Math.random() * 5) + 1
      },
      {
        logo: this.props.logo,
        Name: "Atom-2",
        Price: Math.floor(Math.random() * 101),
        Rate: Math.floor(Math.random() * 5) + 1,
        Display: true
      }
    ]
  };

  render() {
    return (
      <div style={{ position: "absolute", left: "0", right: "0" }}>
        <Redirect to="/ComingSoon" />
        <div Style="text-align:center">
          <img
            src={this.props.logo}
            alt="Atom"
            className="rounded mx-auto d-block image-1"
          />
        </div>
        <Table data={this.props.data} ApplyType="Create Whole Event" />
      </div>
    );
  }
}
const mapState = state => {
  return {
    data: state.firestore.ordered.CreateWholeEvent
  };
};
export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "CreateWholeEvent" }])
)(CreateYourEvent);
