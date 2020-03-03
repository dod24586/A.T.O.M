import React from "react";
import "./LoginScreen.css";
import { Link } from "react-router-dom";
import GoogleLogin from "../../img/GoogleLogin(1).png";
import FacebookLogin from "../../img/FacebookLogin.png";
import { connect } from "react-redux";
import { Login, SocialLogin } from "./../../Redux/Actions/AuthActions";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
  state = {
    Email: "",
    Password: "",
    errors: null
  };
  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = event => {
    event.preventDefault();
    this.props.Login(this.state);
  };
  render() {
    // const { Email, Password } = this.state;
    // const isValid = Password === "" || Email === "";
    if (this.props.login) {
      return <Redirect to="/" />;
    } else
      return (
        <form className="LoginForm" autoComplete="off" onSubmit={this.submit}>
          <p className="LoginHeader">Login</p>

          <input
            onChange={this.OnChanage}
            type="email"
            name="Email"
            className="w3-input"
            placeholder="Enter Your E-mail"
          />
          <input
            onChange={this.OnChanage}
            type="password"
            name="Password"
            className="w3-input"
            // className="form-control form-control-sm mt-2"
            placeholder="Enter Your Password"
          />
          <p>
            <Link to="/ForgetPassword">Forget Password</Link>
          </p>
          <button className="btn btn-primary btnSubmit">Submit</button>
          <p className="m-2 or">or</p>

          <img
            src={FacebookLogin}
            className="SigninImage"
            alt="facebook login"
            onClick={() => this.props.SocialLogin("facebook")}
          />
          <br />
          <br />
          <img
            src={GoogleLogin}
            onClick={() => this.props.SocialLogin("google")}
            className="SigninImage"
            alt="google login"
          />
          <p className="m-2 or">
            New to this site?<Link to="/SignUp">Sign Up</Link>
          </p>
          <p className="m-2 or">
            Become a supplier?<Link to="/ApplyForServices">Sign Up</Link>
          </p>
        </form>
      );
  }
}
const mapStateToProps = state => {
  return {
    login: state.firebase.auth.uid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Login: loginUser => dispatch(Login(loginUser)),
    SocialLogin: x => dispatch(SocialLogin(x))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
