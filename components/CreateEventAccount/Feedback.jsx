import React, { Component } from "react";
import Pagnation from "./Pagnation";
import moment from "moment";
import { pagination } from "../../pagination";

class Feedback extends Component {
  state = {
    current: 1,
    data: null,
    Clonedata: null,
    Feild: "All Services"
  };
  UNSAFE_componentWillMount() {
    //console.log("x");
    this.setState({ data: this.props.user.Feedback });
    this.setState({ Clonedata: this.props.user.Feedback });
  }
  handlePageChange = num => {
    this.setState({ current: num });
  };
  handleFilter = field => {
    if (field.target.value === "All Services") {
      this.setState({ data: this.state.Clonedata });

      return true;
    }
    this.setState({ Feild: field.target.value });
    let clone = [...this.state.Clonedata].filter(x => {
      if (x.Services === field.target.value) {
        return true;
      } else return false;
    });
    this.setState({ data: clone });
  };

  render() {
    let usersFeedback = this.props.user.Feedback;

    usersFeedback = pagination(this.state.data, this.state.current, 4);
    return (
      <div>
        {this.props.currentUser === this.props.user.id
          ? null
          : <button className="btn btn-primary" onClick={this.props.popUp}>
              Add Feedback
            </button>}
        <select
          onChange={this.handleFilter}
          value={this.state.Feild}
          style={{
            padding: "12px",
            borderRadius: "28px",
            backgroundColor: "transparent",
            color: " rgb(92, 145, 184)",
            fontWeight: "600",
            marginBottom: "10px"
          }}
        >
          <option value={"All Services"}>All Services</option>
          {this.props.user.allServices.map(x => {
            return (
              <option key={x.Name} style={{ fontSize: "12px" }} value={x.Name}>
                {x.Name}
              </option>
            );
          })}
        </select>

        {usersFeedback && usersFeedback.length > 0
          ? usersFeedback.map((x, INDEX) =>
              <div className="w3-card-4 w3-margin-bottom" key={INDEX}>
                <header className="w3-container w3-light-grey">
                  <h3>
                    {x.FeedbackBy.displayName}
                  </h3>
                </header>
                <div className="w3-container">
                  <p>
                    {moment(x.date.toDate()).fromNow()}
                  </p>
                  <hr />
                  <img
                    src={
                      x.photo ||
                      "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                    }
                    alt="Avatar"
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: "60px" }}
                  />
                  <p>
                    {x.Feedback}
                  </p>
                  <br />
                </div>
              </div>
            )
          : <h4 style={{ color: " rgb(92, 145, 184)" }}>No Feedback yet</h4>}
        <Pagnation
          dataCount={this.state.data.length}
          current={this.state.current}
          OnPageChange={this.handlePageChange}
          Size={4}
        />
      </div>
    );
  }
}

export default Feedback;
