import React, { Component } from "react";
import { connect } from "react-redux";
import { EditingProfile } from "./../../../Redux/Actions/ProfileAction";
import { toastr } from "react-redux-toastr";
class EditProfile extends Component {
  state = { name: "", email: "", phone: "", password: "", password2: "" };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  UpdateFireStore = e => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      toastr.error("Check Password");
      //console.log(this.state);
    } else {
      this.props.editing(this.state);
    }
  };
  render() {
    // //console.log(this.props);

    return (
      <form autoComplete="off" onSubmit={this.UpdateFireStore}>
        <input
          placeholder={this.props.data.email}
          type="email"
          className="w3-input"
          name="email"
          style={{ color: "#000" }}
          onChange={this.onChange}
        />
        <input
          placeholder={this.props.data.displayName}
          type="text"
          className="w3-input"
          name="name"
          onChange={this.onChange}
          style={{ color: "#000" }}
        />
        <input
          placeholder={this.props.data.phone || "Add Your Phone Number"}
          type="tel"
          className="w3-input"
          name="phone"
          pattern={"[0-9]{11}"}
          onChange={this.onChange}
          style={{ color: "#000" }}
        />
        <input
          placeholder="New Password"
          type="password"
          className="w3-input"
          name="password"
          style={{ color: "#000" }}
          onChange={this.onChange}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className="w3-input"
          name="password2"
          onChange={this.onChange}
          style={{ color: "#000" }}
        />
        <button className="btn btn-primary btnSubmit">Submit</button>
      </form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    editing: data => dispatch(EditingProfile(data))
  };
};
export default connect(null, mapDispatchToProps)(EditProfile);
