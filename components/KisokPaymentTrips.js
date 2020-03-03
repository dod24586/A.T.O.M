import React, { Component } from "react";
import { KisokBookingTrip } from "../Redux/Actions/TripsActions";
import { connect } from "react-redux";

import {
  getAuthToken,
  createOrderRegistration,
  getPaymentKey,
  createKioskPayRequest
} from "../utils/KisokPaymentTrips";

class AcceptPayment extends Component {
  state = {
    isLoading: true,
    token: null,
    merchantId: null,
    orderId: null,
    isPaymentKeyLoading: true,
    paymentKey: null,
    iframe: null,
    billRef: null,
    now: 0
  };

  componentWillMount() {}

  componentDidMount() {
    // get auth_token
    this._handleAuthToken();
  }

  // step 1
  _handleAuthToken = () => {
    getAuthToken()
      .then(json => {
        //console.log("Auth Token:\n");
        //console.log(json);
        this.setState(
          {
            isLoading: false,
            token: json.token,
            merchantId: json.profile.id
          },
          () => {
            // call step 2
            this._handleOrderRegistration();
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  // step 2
  _handleOrderRegistration = e => {
    var now = Date.parse(new Date()) / 1000;
    this.setState({ now });
    createOrderRegistration({
      token: this.state.token,
      merchant_id: this.state.merchantId,
      price:
        parseInt(this.props.data.data.Price) *
        parseInt(this.props.data.Number) *
        100,
      email: this.props.data.Email,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      id:
        this.props.data.data.Name +
        this.props.data.data.Place +
        now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      number: this.props.data.Number,
      place: this.props.data.data.Place
    })
      .then(json => {
        //console.log("Order Registration:\n");
        //console.log(json);
        this.setState(
          {
            orderId: json.id
          },
          () => {
            // call step 3
            this._handlePaymentKey();
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  // step 3
  _handlePaymentKey = () => {
    getPaymentKey({
      token: this.state.token,
      order_id: this.state.orderId,
      price:
        parseInt(this.props.data.data.Price) *
        parseInt(this.props.data.Number) *
        100,
      email: this.props.data.Email,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      id:
        this.props.data.data.Name +
        this.props.data.data.Place +
        this.state.now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      number: this.props.data.Number,
      place: this.props.data.data.Place
    })
      .then(json => {
        //console.log("Payment Key:\n");
        //console.log(json);
        this.setState(
          {
            isPaymentKeyLoading: false,
            paymentKey: json.token
          },
          () => {
            // call step 4
            //this._handleCardIframe();
            // kiosk
            this._handleKiosk();
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  // iframe carstep 4
  _handleCardIframe = () => {
    this.setState({
      iframe:
        "https://accept.paymobsolutions.com/api/acceptance/iframes/11545?payment_token=" +
        this.state.paymentKey
    });
  };

  // kiosk
  _handleKiosk = () => {
    createKioskPayRequest({ paymentKey: this.state.paymentKey })
      .then(json => {
        //console.log("Kiosk Pay:\n");
        //console.log(json);
        this.setState({
          isPaymentKeyLoading: false,
          billRef: json.data.bill_reference
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    //const iframe = "https://accept.paymobsolutions.com/api/acceptance/iframes/11544?payment_token="+this.state.paymentKey
    var data = {
      price:
        parseInt(this.props.data.data.Price) *
        parseInt(this.props.data.Number) *
        100,
      email: this.props.data.Email,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      id:
        this.props.data.data.Name +
        this.props.data.data.Place +
        this.state.now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      number: this.props.data.Number,
      place: this.props.data.data.Place,
      type: "Trip",
      order_id: this.state.orderId,
      data: this.props.data.data,
      bill: this.state.billRef
    };
    if (typeof this.state.orderId === typeof 1 && this.state.billRef) {
      this.props.BookingForm(data);
      //console.log("i am om");
    }
    return (
      <div>
        {this.state.billRef === null
          ? <div>Loading...</div>
          : <div>
              <div>
                <div>
                  <p>
                    {this.state.billRef}
                  </p>
                  <button
                    className="btn btn-danger btnSubmit"
                    onClick={this.props.Open}
                    style={{ width: "50%", margin: "auto" }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    BookingForm: data => dispatch(KisokBookingTrip(data))
  };
};
export default connect(null, mapDispatchToProps)(AcceptPayment);

/*<iframe
                                src={this.state.iframe}
                                width={"100%"}
                                height={"800px"}
                            />*/
