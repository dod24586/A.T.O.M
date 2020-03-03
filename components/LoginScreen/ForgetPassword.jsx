import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserForgetPassword } from "../../Redux/Actions/AuthActions";
class ForgetPassword extends React.Component {
  state = {
    email: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = event => {
    event.preventDefault();
    this.props.UserForgetPassword(this.state.email);
    this.props.history.push("/Login");
  };
  render() {
    //console.log(this.props);
    return (
      <form className="LoginForm" onSubmit={this.submit} autoComplete="off">
        <p className="LoginHeader">Forget Password</p>
        <input
          type="email"
          placeholder="Enter Your E-mail"
          className="w3-input"
          name="email"
          onChange={this.onChange}
        />
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "rgba(139, 0, 0, 1)",
            borderColor: "rgba(139, 0, 0, 1)"
          }}
        >
          Reset Password
        </button>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    error: state.Auth.AuthError
  };
};
const mapDispatchToProps = dispatch => {
  return { UserForgetPassword: User => dispatch(UserForgetPassword(User)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
);
