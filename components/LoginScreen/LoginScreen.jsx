import React from "react";
import "./LoginScreen.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Login } from "./../../Redux/Actions/AuthActions";
import { Redirect, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import ApplyForServiceSignUp from "./ApplyForServiceSignUp";
const LoginScreen = props => {
  if (props.login.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div className="centerlized">
      <div>
        <div className="FlexImage">
          <div className="LoginImage">
            <img src={props.logo} alt={props.title} />
            <h2
              className="PacificaCondensed LoginImage"
              style={{ height: "0", marginBottom: "10%", position: "absolute" }}
            >
              Atomic Your Event
            </h2>
            <div style={{ color: "white", textAlign: "center" }}>
              © 2019 Atom.inc All Rights Reserved.
            </div>
            <div className="clearfix" />
          </div>
          <Switch>
            <Route component={SignUp} path="/SignUp" />
            <Route component={SignIn} path="/Login" />
            <Route component={ForgetPassword} path="/ForgetPassword" />
            <Route component={ApplyForServiceSignUp} path="/ApplyForServices" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.firebase.auth,
    error: state.Auth.AuthError
  };
};
const mapDispatchToProps = dispatch => {
  return { Login: loginUser => dispatch(Login(loginUser)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
