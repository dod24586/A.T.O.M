import React from "react";
import "./main.css";
import { connect } from "react-redux";
import { storage } from "../../config/firebase";
import { Redirect } from "react-router-dom";
import { EventSupplierForm } from "../../Redux/Actions/AuthActions";
//import EventSupplierAccount from "./EventSupplierAccount";
class EventSupplier extends React.Component {
  state = {
    Name: "",
    CompanyName: "",
    Location: "",
    BankName: "",
    BankAccountName: "",
    BankAccountNumber: "",
    SwiftCode: "",
    TaxCardImage: "",
    TaxCardNumberImage: "",
    /// TaxCard: "",
    TaxCardNumber: "",
    CommercialRegistrationImage: "",
    CommercialRegistrationNumber: "",
    Phone: "",
    Email: "",
    Website: "",

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
  submit = event => {
    event.preventDefault();
    if (
      this.state.TaxCardImage.length &&
      this.state.CommercialRegistrationImage.length
    ) {
      this.props.SendDataToFirebase(this.state);
    } else {
    }
  };
  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    //console.log(this.props);
    if (!this.props.auth.uid) return <Redirect to="/ApplyForServices" />;
    if (this.props.EventSupplier)
      return <Redirect to="/EventSupplier/CurrentEvent" />;
    if (this.props.profile.Supplier)
      return (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#fff" }}> Wait For acception</h1>
        </div>
      );
    if (!this.props.profile.isLoaded) {
      return (
        <div style={{ textAlign: "center" }}>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div className="centerlized">
        <div>
          <div className="FlexImage">
            <div className="LoginImage">
              <img src={this.props.logo} alt={this.props.title} />
              <h2
                className="PacificaCondensed LoginImage"
                style={{
                  height: "0",
                  marginBottom: "10%",
                  position: "absolute"
                }}
              >
                Atomic Your Event
              </h2>
              <div className="clearfix" />
            </div>
            {/*here */}
            <form
              onSubmit={this.submit}
              className="LoginForm"
              autoComplete="off"
            >
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
                required
                value={this.state.Movie}
                style={{
                  color: this.state.option1 === "" ? "#757575" : "white"
                }}
              >
                <option style={{ color: "black" }} value="">
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
                placeholder="Bank Account Name"
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
                  onChange={e => this.handlingChangeImage2(e)}
                />
                <label
                  className="custom-file-label"
                  style={{ textAlign: "left" }}
                  for="inputGroupFile01"
                >
                  <p>Tax Card</p>{" "}
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
                  name="TaxCardNumberImage"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={e => this.handlingChangeImage1(e)}
                />
                <label
                  className="custom-file-label"
                  style={{ textAlign: "left" }}
                  for="inputGroupFile01"
                >
                  <p>Commercial Registration</p>{" "}
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
                name="CommercialRegistrationNumber"
                placeholder="Commercial Registration Number"
                required="on"
              />

              <button className="btn btn-primary btnSubmit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SendDataToFirebase: data => dispatch(EventSupplierForm(data))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    EventSupplier: state.firebase.profile.EventData
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventSupplier);
/*if (!this.props.auth.uid) return <Redirect to="/Login" />;
    if (this.props.EventSupplier)
      return <Redirect to="/EventSupplier/CurrentEvent" />;*/
