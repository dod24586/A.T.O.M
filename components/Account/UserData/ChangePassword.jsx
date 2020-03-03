import React from "react";
import { connect } from "react-redux";
import { UpdatePassword } from "./../../../Redux/Actions/AuthActions";
class ChangePassword extends React.Component {
  state = { password1: "", password2: "" };
  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = e => {
    e.preventDefault();
    this.props.UpdatePassword(this.state);
  };
  render() {
    const { password1, password2 } = this.state;
    const isValid = password1 !== password2;
    return (
      <form autoComplete="off" onSubmit={this.submit}>
        <input
          placeholder="New Password"
          type="password"
          className="w3-input"
          name="password1"
          style={{ color: "#000" }}
          onChange={this.OnChanage}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className="w3-input"
          name="password2"
          onChange={this.OnChanage}
          style={{ color: "#000" }}
        />
        <button disabled={isValid} className="btn btn-primary btnSubmit">
          Submit
        </button>
      </form>
    );
  }
}
const mapStateToProps = () => {};
const mapDispatchToProps = dispatch => {
  return {
    UpdatePassword: NewPassword => dispatch(UpdatePassword(NewPassword))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
