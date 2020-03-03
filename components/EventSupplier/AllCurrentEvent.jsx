import React, { Component } from "react";
import Card from "./Card";
import Booker from "./Booker";
import { Redirect } from "react-router-dom";
class AllCurrentEvent extends Component {
  state = {
    showPopup: false,
    data: {}
  };

  displayBooker = e => {
    this.setState({ showPopup: !this.state.showPopup });
    this.setState({ data: e });
  };
  render() {
    var trips =
      this.props.data &&
      this.props.data.filter(
        data => (data.Xid && data.Xid === this.props.user ? true : false)
      );
    var tripsReq =
      this.props.dataReq &&
      this.props.dataReq.filter(
        data => (data.Xid && data.Xid === this.props.user ? true : false)
      );
    //console.log(this.props.user);
    //console.log(tripsReq, trips);
    if (!this.props.handle.allServices.find(x => x.Name === "Trips")) {
      return <Redirect to="/EventSupplier/Setting" />;
    }
    return (
      <div /*style={{ display: "-webkit-box" }}*/>
        {trips || tripsReq
          ? <div style={{ display: "-webkit-box" }}>
              {trips &&
                trips.map(data =>
                  <Card
                    key={data.id}
                    data={data}
                    show={true}
                    open={this.displayBooker}
                  />
                )}
              {tripsReq &&
                tripsReq.map(data =>
                  <Card
                    key={data.id}
                    data={data}
                    show={false}
                    open={this.displayBooker}
                  />
                )}
            </div>
          : <div style={{ justifyContent: "center" }}>
              <p>Nothing Created yet</p>
            </div>}
        {this.state.showPopup
          ? <Booker closePopup={this.displayBooker} data={this.state.data} />
          : null}
      </div>
    );
  }
}

export default AllCurrentEvent;
