import React, { Component } from "react";
import "../Make_Event/PopUp.css";
import "../Make_Event/BookingForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import StarRatingComponent from "react-star-rating-component";
import { Feedback } from "../../Redux/Actions/ContactAndFeedbackAction";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

class AddFeedBack extends Component {
  state = { Rate: 0, Feedback: "", Feild: "", uid: this.props.user.id };
  handleSelect = e => {
    if (this.state.Feild === "") {
      toastr.error("You Must Select Services");
    }
    this.setState({ Feild: e.target.value });
    //console.log(this.state.Feild);
  };
  handleChange = e => {
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
    return (
      <div className="popup fixed">
        <div className="popup\_inner ">
          <FontAwesomeIcon icon={faTimes} onClick={this.props.closePopup} />
          <h2 className="heading" style={{ textAlign: "center" }}>
            Feedback Form{" "}
          </h2>

          <form autoComplete="off" onSubmit={this.submit}>
            <select
              onChange={this.handleSelect}
              value={this.state.Feild}
              style={{ padding: "12px", borderRadius: "28px" }}
            >
              <option selected={true} value="" disabled={true}>
                Select Service
              </option>
              <option
                style={{ fontSize: "12px" }}
                value={this.props.user.allServices.option1.Name}
              >
                {this.props.user.allServices.option1.Name}
              </option>
              <option
                style={{ fontSize: "12px" }}
                value={this.props.user.allServices.option2.Name}
              >
                {this.props.user.allServices.option2.Name}
              </option>
              <option
                style={{ fontSize: "12px" }}
                value={this.props.user.allServices.option3.Name}
              >
                {this.props.user.allServices.option3.Name}
              </option>
            </select>
            <br />
            <br />

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
    SendFeedback: data => dispatch(Feedback(data))
  };
};
export default connect(null, mapDispatchToProps)(AddFeedBack);
