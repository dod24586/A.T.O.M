import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignUp } from "./../../Redux/Actions/AuthActions";
import { Redirect } from "react-router-dom";

/*const initialState = {
  FullName: "",
  Phone: "",
  Email: "",
  Password1: "",
  Password2: "",
  error: null
};*/
class SignUpForm extends React.Component {
  state = {
    FullName: "",
    Phone: "",
    Email: "",
    Password1: "",
    Password2: "",
    error: null,
    Apply: false,
    User: false
  };
  submit = event => {
    event.preventDefault();
    this.props.SignUp(this.state);
  };

  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleRadioButton = event => {
    if (event.target.name === "Apply") {
      this.setState({ Apply: true, User: false });
    } else {
      this.setState({ Apply: false, User: true });
    }
  };

  render() {
    const { Password1, Password2 } = this.state;
    const isValid = Password1 !== Password2;

    if (this.props.auth.uid) return <Redirect to="/" />;
    return (
      <form onSubmit={this.submit} className="LoginForm" autoComplete="off">
        <p className="LoginHeader">Sign Up</p>
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="FullName"
          placeholder="FullName"
        />
        <input
          onChange={this.OnChanage}
          type="tel"
          className="w3-input"
          pattern={"[0-9]{11}"}
          name="Phone"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
        />
        <input
          onChange={this.OnChanage}
          type="email"
          className="w3-input"
          name="Email"
          placeholder="E-mail"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          className="w3-input"
          name="Password1"
          placeholder="Password"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          //className="form-control form-control-sm mt-2"
          className="w3-input"
          name="Password2"
          placeholder="Confrim Password"
        />
        <br />

        <button disabled={isValid} className="btn btn-primary btnSubmit">
          Submit
        </button>
        <p className="or">
          Already a member?<Link to="/Login"> Log In</Link>
        </p>
      </form>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    error: state.Auth.AuthError
  };
};
const mapDispatchToProps = dispatch => {
  return { SignUp: NewUser => dispatch(SignUp(NewUser)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
