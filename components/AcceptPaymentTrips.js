import React, { Component } from "react";

import {
  getAuthToken,
  createOrderRegistration,
  getPaymentKey
} from "../utils/AcceptPaymentTrips";
import { BookingTrip } from "../Redux/Actions/TripsActions";
import { connect } from "react-redux";

class AcceptPayment extends Component {
  state = {
    isLoading: true,
    token: null,
    merchantId: null,
    orderId: null,
    isPaymentKeyLoading: true,
    paymentKey: null,
    iframe: null,
    now: 0 //price: parseInt(this.props.data.Number) * Pthis.props.data.data.Price * 100
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
        //console.log("Auth Token" + json);
        this.setState(
          {
            isLoading: false,
            token: json.token,
            merchantId: json.merchant_id
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
        //console.log("Order Registration" + json);
        //console.log(JSON.stringify(json));

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
        //console.log("Payment Key" + json);
        var data = {
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
          data: this.props.data.data,
          location: this.props.data.Location,
          number: this.props.data.Number,
          place: this.props.data.data.Place,
          type: "Trip"
        };
        if (this.state.orderId !== null) {
          this.props.BookingForm(data);
        }
        this.setState(
          {
            isPaymentKeyLoading: false,
            paymentKey: json.token
          },
          () => {
            // call step 4
            this._handleIframe();
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  // step 4
  _handleIframe = () => {
    this.setState({
      iframe:
        "https://accept.paymobsolutions.com/api/acceptance/iframes/11545?payment_token=" +
        this.state.paymentKey
    });
  };

  render() {
    //const iframe = "https://accept.paymobsolutions.com/api/acceptance/iframes/11544?payment_token="+this.state.paymentKey

    return (
      <div>
        {this.state.iframe === null
          ? <div>Loading...</div>
          : <iframe
              title="payment frame"
              src={this.state.iframe}
              width={"100%"}
              style={{ border: "none" }}
              height={"800px"}
            />}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    BookingForm: data => dispatch(BookingTrip(data))
  };
};
export default connect(null, mapDispatchToProps)(AcceptPayment);
