import React, { Component } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcceptPayment from "../AcceptPayment";
import KisokPayment from "../KisokPayment";

class EventForm extends Component {
  state = {
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Age: 0,
    Location: "",
    Price: this.props.data.price || this.props.data.Price,
    Place: this.props.data.Name || this.props.data.name,
    Movie: "",
    data: this.props.data,
    appearKisok: false,
    appearForm: true,

    appearCard: false
  };
  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  OnChanage = event => {
    if (event.target.name === "Number" && event.target.value < 1) {
      this.setState({ [event.target.name]: 1 });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  submit = (e, where) => {
    e.preventDefault();
    this.setState({ appearForm: !this.state.appearForm });
  };
  handlePayment = where => {
    if (where === "Card") {
      this.setState({ appearCard: !this.state.appearCard });
      this.setState({ appearKisok: false });
    } else {
      this.setState({ appearKisok: !this.state.appearKisok });
      this.setState({ appearCard: false });
    }
  };
  render() {
    /*const isValid =
          this.state.FirstName === "" ||
          this.state.LastName === "" ||
          this.state.Phone === "" ||
          this.state.Email === "";*/
    return (
      <div
        className="popup fixed"
        style={{
          background: "-webkit-linear-gradient(bottom, #000, #191654)",
          zIndex: "1"
        }}
      >
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: "#fff" }}
            onClick={this.props.Open}
          />
          <h2 className="heading" style={{ textAlign: "center" }}>
            Register For Event
          </h2>

          <form autoComplete="off" onSubmit={this.submit}>
            <div className="BookingForm">
              <input
                onChange={this.OnChanage}
                type="text"
                className="w3-input"
                required={true}
                disabled={!this.state.appearForm}
                style={{ color: "#fff" }}
                name="FirstName"
                placeholder="First Name"
              />
              <input
                onChange={this.OnChanage}
                type="text"
                className="w3-input"
                required={true}
                disabled={!this.state.appearForm}
                style={{ color: "#fff" }}
                name="LastName"
                placeholder="Last Name"
              />
              <input
                onChange={this.OnChanage}
                type="tel"
                className="w3-input"
                required={true}
                disabled={!this.state.appearForm}
                style={{ color: "#fff" }}
                pattern={"[0-9]{11}"}
                name="Phone"
                placeholder="Phone Number"
              />
              <input
                onChange={this.OnChanage}
                type="email"
                className="w3-input"
                required={true}
                disabled={!this.state.appearForm}
                style={{ color: "#fff" }}
                name="Email"
                placeholder="E-mail"
              />
              <select
                className="w3-input"
                name="Location"
                onChange={this.handleSelect}
                required
                value={this.state.Location}
                style={{
                  color: this.state.Location === "" ? "#757575" : "white"
                }}
              >
                <option style={{ color: "black" }} value="">
                  Choose Your Location
                </option>
                <option style={{ color: "black" }} value="October">
                  October
                </option>
                <option style={{ color: "black" }} value="Mohandseen">
                  Mohandseen
                </option>{" "}
                <option style={{ color: "black" }} value="Naser City">
                  Naser City
                </option>
                <option style={{ color: "black" }} value="Haram">
                  Haram
                </option>
                <option style={{ color: "black" }} value="Maadi">
                  Maadi
                </option>
              </select>
              <input
                onChange={this.OnChanage}
                type="number"
                className="w3-input"
                required={true}
                disabled={!this.state.appearForm}
                style={{ color: "#fff" }}
                min="1"
                name="Age"
                placeholder="Age"
              />
              <br />
              <select
                className="w3-input"
                name="Movie"
                onChange={this.handleSelect}
                required
                value={this.state.Movie}
                style={{ color: this.state.Movie === "" ? "#757575" : "white" }}
              >
                <option
                  style={{ color: "black" }}
                  selected="true"
                  disabled={true}
                  value=""
                >
                  Choose a movie for the night
                </option>
                {this.props.data.Movie &&
                  this.props.data.Movie.map(MOVIE =>
                    <option style={{ color: "black" }} value={MOVIE}>
                      {MOVIE}
                    </option>
                  )}
              </select>
            </div>

            <br />
            <div className="BookingForm">
              <h2 className="heading" style={{ textAlign: "center" }}>
                Payment method
              </h2>
              {this.state.appearForm
                ? <button
                    type="submit"
                    value="Card"
                    className="btn btn-primary btnSubmit"
                    style={{ width: "fit-content" }}
                  >
                    Next >>
                  </button>
                : null}

              <br />
            </div>
          </form>
          <div className="BookingForm">
            {!this.state.appearForm &&
            this.state.appearKisok === this.state.appearCard
              ? <React.Fragment>
                  <button
                    type="submit"
                    value="Card"
                    onClick={e => this.handlePayment("Card")}
                    className="btn btn-primary btnSubmit"
                    style={{ width: "fit-content" }}
                  >
                    Debit Card / Credit Card
                  </button>
                  <button
                    type="submit"
                    value="Kiosk"
                    onClick={e => this.handlePayment("Kiosk")}
                    className="btn btn-primary btnSubmit"
                    style={{ width: "fit-content" }}
                  >
                    Aman or Masary
                  </button>
                </React.Fragment>
              : null}
          </div>
          {this.state.appearCard
            ? <AcceptPayment
                Submitting={this.submit}
                data={this.state}
                UnAuthEvent={this.props.UnAuthEvent}
              />
            : null}
          {this.state.appearKisok
            ? <React.Fragment>
                <p>
                  Save that number and pay to nearest Aman or Masary machine
                </p>
                <p>Check Your Email</p>

                <KisokPayment Open={this.props.Open} data={this.state} />
              </React.Fragment>
            : null}
        </div>
      </div>
    );
  }
}

export default EventForm;
/*	Harry Potter and the Philosopher's Stone (2001)
	Harry Potter and the Chamber of Secrets (2002)
Harry Potter and the Prisoner of Azkaban (2004)
	Harry Potter and the Goblet of Fire (2005)
	Harry Potter and the Order of the Phoenix (2007)
	Harry Potter and the Half-Blood Prince (2009)
	Harry Potter and the Deathly Hallows – Part 1 (2010)
	Harry Potter and the Deathly Hallows – Part 2 (2011) */
