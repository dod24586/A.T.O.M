import React, { Component } from "react";
import { Button } from "react-bootstrap";
import EventForm from "./EventForm";
class EventBox extends Component {
  state = { appearForm: false };
  Open = () => {
    this.setState({ appearForm: !this.state.appearForm });
  };
  render() {
    return (
      <div className="w3-show-inline-block">
        <div
          className="w3-card-3  w3-border MobileMarge"
          style={{ position: "relative" }}
        >
          <img
            src={this.props.image}
            className="card-img-size"
            style={{ height: "auto", maxWidth: "300px" }}
            alt="Atom"
          />

          <Button
            variant="outline-danger"
            onClick={this.Open}
            style={{
              position: "absolute",
              left: "108px",
              top: "85px"
            }}
          >
            Register
          </Button>
        </div>
        {this.state.appearForm
          ? <EventForm Open={this.Open} data={this.props.data} />
          : null}
      </div>
    );
  }
}

export default EventBox;
