import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { ApplySignUp } from "./../../Redux/Actions/AuthActions";
//import { toastr } from "react-redux-toastr";
import { storage } from "../../config/firebase";

class ApplyForServicesSignUp extends Component {
  state = {
    Name: "",
    CompanyName: "",
    Location: "",
    BankName: "",
    BankAccountName: "",
    BankAccountNumber: "",
    SwiftCode: "",
    TaxCardImage: null,
    /// TaxCard: "",
    TaxCardNumber: "",
    CommercialRegistrationImage: null,
    CommercialRegistrationNumber: "",
    Phone: "",
    Email: "",
    Website: "",
    Password1: "",
    Password2: "",
    error: null,
    Apply: true,
    option1: "",
    option2: "",
    option3: "",
    time1: 0,
    price1: 0,
    time2: 0,
    price2: 0,
    time3: 0,
    price3: 0,
    progress1: 0,
    progress2: 0
  };
  submit = event => {
    event.preventDefault();
    ///let clone = [...this.state.checkbox];
    /*clone = clone.filter(x => (x.state ? true : false));
    if (clone.length <= 0) {
      toastr.error("You Must Choose at least one Services");
    } else {
      this.props.SignUp(this.state);
    }*/
    /*console.log(
      typeof this.state.TaxCardImage,
      typeof this.state.CommercialRegistrationImage
    );*/
    if (
      this.state.TaxCardImage.length &&
      this.state.CommercialRegistrationImage.length
    ) {
      this.props.SignUp(this.state);
    } else {
    }
  };

  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state);
  };
  handlingChangeImage1 = e => {
    if (e.target.files[0]) {
      const TaxCardImage = e.target.files[0];
      this.setState(() => ({ TaxCardImage }));
      const uploadTask = storage
        .ref(`${this.state.CompanyName}/${TaxCardImage.name}`)
        .put(TaxCardImage);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress1 = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );
          this.setState({ progress1 });
        },
        error => {
          // error function ....
          ////console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref(`${this.state.CompanyName}`)
            .child(TaxCardImage.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ TaxCardImage: url });
            });
        }
      );
    }
    //console.log("error", e);
  };
  handlingChangeImage2 = e => {
    if (e.target.files[0]) {
      const CommercialRegistrationImage = e.target.files[0];
      this.setState(() => ({ CommercialRegistrationImage }));
      const uploadTask = storage
        .ref(`${this.state.CompanyName}/${CommercialRegistrationImage.name}`)
        .put(CommercialRegistrationImage);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress2 = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );
          this.setState({ progress2 });
        },
        error => {
          // error function ....
          //console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref(`${this.state.CompanyName}`)
            .child(CommercialRegistrationImage.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ CommercialRegistrationImage: url });
              console.error(this.state);
            });
        }
      );
    }
    //console.log("error");
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
          name="Name"
          placeholder="Fullname"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="CompanyName"
          placeholder="Company Name"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="Website"
          placeholder="Website"
        />
        <input
          onChange={this.OnChanage}
          type="tel"
          className="w3-input"
          name="Phone"
          pattern={"[0-9]{11}"}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="email"
          className="w3-input"
          name="Email"
          placeholder="E-mail"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          className="w3-input"
          name="Password1"
          placeholder="Password"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          //className="form-control form-control-sm mt-2"
          className="w3-input"
          name="Password2"
          placeholder="Confrim Password"
          required={"on"}
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="Location"
          placeholder="Location"
          required="on"
        />
        <select
          className="w3-input"
          name="option1"
          onChange={this.OnChanage}
          required="on"
          value={this.state.option1}
          style={{ color: this.state.option1 === "" ? "#757575" : "white" }}
        >
          <option
            style={{ color: "black" }}
            selected="true"
            disabled={true}
            value=""
          >
            Supplier for
          </option>
          <option style={{ color: "black" }} value={"Trips"}>
            Trips
          </option>
          <option
            style={{
              /*color: "black"*/
            }}
            disabled={true}
            value={"Ushering"}
          >
            Ushering
          </option>
          <option
            style={{
              /*color: "black"*/
            }}
            disabled={true}
            value={"Event"}
          >
            Event
          </option>
          <option
            style={{
              /*color: "black"*/
            }}
            disabled={true}
            value={"Wedding"}
          >
            Wedding
          </option>
          <option
            style={{
              /* color: "black"*/
            }}
            disabled={true}
            value={"Logistics"}
          >
            Logistics
          </option>
        </select>
        <br />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="BankName"
          placeholder="Bank Name"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="BankAccountName"
          placeholder="Bank Account Holder Name"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="BankAccountNumber"
          placeholder="Bank Account Number"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="SwiftCode"
          placeholder="Swift Code"
          required="on"
        />

        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            name="TaxCardImage"
            required="on"
            aria-describedby="inputGroupFileAddon01"
            onChange={e => this.handlingChangeImage1(e)}
          />
          <label
            className="custom-file-label"
            style={{ textAlign: "left" }}
            for="inputGroupFile01"
          >
            <p>Tax Card</p>
          </label>
        </div>
        <br />
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={this.state.progress1}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: this.state.progress1 + "%" }}
          >
            {this.state.progress1 < 100
              ? <span>
                  {this.state.progress1}%
                </span>
              : <span>100% Completed</span>}
          </div>
        </div>
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="TaxCardNumber"
          placeholder="Tax Card Number"
          required="on"
        />

        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            required="on"
            name="CommercialRegistrationImage"
            aria-describedby="inputGroupFileAddon01"
            onChange={e => this.handlingChangeImage2(e)}
          />
          <label
            className="custom-file-label"
            style={{ textAlign: "left" }}
            for="inputGroupFile01"
          >
            <p>Commercial Registration</p>
          </label>
        </div>
        <br />
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={this.state.progress2}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: this.state.progress2 + "%" }}
          >
            {this.state.progress2 < 100
              ? <span>
                  {this.state.progress2}%
                </span>
              : <span>100% Completed</span>}
          </div>
        </div>
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="CommercialRegistrationNumber"
          placeholder="Commercial Registration Number"
          required="on"
        />

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
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SignUp: NewUser => dispatch(ApplySignUp(NewUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ApplyForServicesSignUp
);
/*<input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="BankNumber"
          placeholder="BankNumber"
          required="on"
        />



this.state.checkbox.map((x, index) => {
            return (
              <React.Fragment key={x.Name}>
                <input
                  type="checkbox"
                  name={x.Name}
                  onClick={() => this.handleCheckBox(x.Name)}
                />
                {x.Name}
                <div
                  style={{
                    display: this.state.checkbox[index].state ? "block" : "none"
                  }}
                >
                  <br />
                  <input
                    type="number"
                    className="w3-input"
                    placeholder="Avg Time (in Hour)"
                    name="AvgTime"
                    required={this.state.checkbox[index].state ? true : false}
                    onChange={event => this.onChangeServices(event, index)}
                  />
                  <input
                    type="number"
                    className="w3-input"
                    placeholder="Avg Price (in EGP)"
                    name="AvgPrice"
                    required={this.state.checkbox[index].state ? true : false}
                    onChange={event => this.onChangeServices(event, index)}
                  />
                </div>
                <br />
              </React.Fragment>
            );
          })*/
/*handleCheckBox = name => {
    const clone = [...this.state.checkbox].map(x => {
      if (x.Name === name) {
        return { ...x, state: !x.state };
      } else return x;
    });

    this.setState({ checkbox: clone });
    //console.log(clone);
  };*/
/*onChangeServices = (event, index) => {
    const clone = [...this.state.checkbox];
    if (event.target.name === "AvgPrice") {
      clone[index].AvgPrice = event.target.value;
    } else {
      clone[index].AvgTime = event.target.value;
    }

    this.setState({ checkbox: clone });
  };*/
