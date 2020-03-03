import React, { Component } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../config/firebase";
import Table1 from "./Table";
class Booker extends Component {
  state = { data: null };
  UNSAFE_componentWillMount() {
    let x = db.collection(this.props.data.id).get().then(snapshot => {
      let arr = snapshot.docs.map(doc => {
        //console.log(doc.data());
        return doc.data();
      });
      this.setState({ data: arr });
      //console.log(arr);
    });
    //console.log(x);
  }

  render() {
    return (
      <div className="popup fixed">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faTimes} onClick={this.props.closePopup} />

          <div style={{ textAlign: "center", marginTop: "100px" }}>
            {this.state.data && this.state.data.length > 0
              ? <Table1 data={this.state.data} />
              : <p>None Booked Yet</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Booker;
// this.state.data.map(x =>
//   <div
//     key={x.OrderId}
//     style={{
//       backgroundColor: "aliceblue",
//       borderBottom: "1px solid"
//     }}
//   >
//     <h6>
//       Name : {x.firstname} {x.lastname}
//     </h6>
//     <h6>Email : {x.email}</h6> <h6>Tickets no : {x.numberOfTickets}</h6>{" "}
//     <h6>Phone : {x.phone}</h6>
//     <h6>Location : {x.location || "Cairo"}</h6>
//   </div>
// );
