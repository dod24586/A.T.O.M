import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { toastr } from "react-redux-toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SendFeedback } from "../../../Redux/Actions/TripsActions";
import { connect } from "react-redux";
class ReportFeedback extends Component {
  state = { Rate: 0, Feedback: "", notifiData: this.props.data };
  handleChange = e => {
    //console.log(this.state);

    this.setState({ Feedback: e.target.value });
  };
  onStarClick = (nextValue, prevValue, name) => {
    let Rate = nextValue;
    this.setState({ Rate });
  };
  submit = e => {
    e.preventDefault();
    //console.log(this.state);
    if (this.state.Rate === 0 || this.state.Feedback === "") {
      toastr.error("You Must Add Your Rate and Feedback");
    } else {
      this.props.SendFeedback(this.state);
    }
  };
  render() {
    //console.log(this.props.data);
    return (
      <div className="popup">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={this.props.displayFeedback}
          />
          <h2 className="heading" style={{ textAlign: "center" }}>
            Report Feedback
          </h2>
          <form autoComplete="off" onSubmit={this.submit}>
            <div className="BookingForm">
              <textarea
                rows="4"
                cols="50"
                onChange={this.handleChange}
                type="text"
                className="w3-input"
                style={{ color: "#000" }}
                name="Feedback"
                placeholder="Feedback"
              />
              <br />
              <br />
              <StarRatingComponent
                name={this.state.Feild}
                starCount={5}
                value={this.state.Rate}
                starColor="rgb(255, 180, 0)"
                onStarClick={this.onStarClick}
              />
            </div>

            <br />

            <button className="btn btn-primary btnSubmit BookingForm">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SendFeedback: data => dispatch(SendFeedback(data))
  };
};
export default connect(null, mapDispatchToProps)(ReportFeedback);
