import React, { Component } from "react";
import GoogleLogo from "../../img/GoogleLogo.png";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { SendContact } from "../../Redux/Actions/ContactAndFeedbackAction";

const mapDispatchToProps = dispatch => {
  return {
    SendContact: (data, ApplyId, MoreData) =>
      dispatch(SendContact(data, ApplyId, MoreData))
  };
};
const mapStateToProps = state => {
  return {};
};
class Contact extends Component {
  state = { WhatYouWant: "", Feild: "", email: "", phone: "" };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelect = e => {
    this.setState({ Feild: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    if (
      this.state.WhatYouWant === "" ||
      this.state.Feild === "" ||
      this.state.email === "" ||
      this.state.phone === ""
    ) {
      toastr.error("Check your Feild");
    } else {
      this.props.SendContact(this.state, this.props.ApplyId, this.props.user);
      //console.log(this.props);
    }
  };

  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.submit}>
          <select
            onChange={this.handleSelect}
            value={this.state.Feild}
            style={{
              padding: "12px",
              borderRadius: "28px",
              backgroundColor: "transparent",
              color: " rgb(92, 145, 184)",
              fontWeight: "600"
            }}
          >
            <option value=" ">Select Service</option>
            {this.props.user.allServices.map(x => {
              return (
                <option
                  key={x.Name}
                  style={{ fontSize: "12px" }}
                  value={x.Name}
                >
                  {x.Name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <div className="BookingForm">
            <input
              className="w3-input"
              style={{ color: " rgb(92, 145, 184)" }}
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <input
              className="w3-input"
              name="phone"
              type="tel"
              style={{ color: " rgb(92, 145, 184)" }}
              pattern={"[0-9]{11}"}
              placeholder="phone"
              onChange={this.handleChange}
            />
            <textarea
              rows="4"
              cols="50"
              onChange={this.handleChange}
              type="text"
              style={{ color: " rgb(92, 145, 184)" }}
              className="w3-input"
              name="WhatYouWant"
              placeholder="What You Want ?"
            />
          </div>
          <br />
          <button className="btn btn-primary btnSubmit BookingForm">
            Submit
          </button>
          <hr />
          <small style={{ textAlign: "center", color: "red" }}>
            or Mail Him
          </small>
          <div>
            <a href={`mailto:${this.props.user.email}`}>
              <img
                src={GoogleLogo}
                width="25px"
                height="25px"
                alt="Google Icon"
              />
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
