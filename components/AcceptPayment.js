import React, { Component } from "react";

import {
  getAuthToken,
  createOrderRegistration,
  getPaymentKey
} from "../utils/AcceptPayment";
import { UnAuthEvent } from "../Redux/Actions/EventAction";
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
    now: 0
    //price: parseInt(this.props.data.Number) * Pthis.props.data.Price * 100
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
    this.setState({ now: now });
    createOrderRegistration({
      token: this.state.token,
      merchant_id: this.state.merchantId,
      price: parseInt(this.props.data.Price) * 100,
      email: this.props.data.Email,
      state: this.props.data.Location,
      city: this.props.data.Location,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      id:
        this.props.data.Place +
        this.state.now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      place: this.props.data.Place,
      type: "Event"
    })
      .then(json => {
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
      price: parseInt(this.props.data.Price) * 100,
      email: this.props.data.Email,
      state: this.props.data.Location,
      city: this.props.data.Location,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      age: this.props.data.Age,
      id:
        this.props.data.Place +
        this.state.now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      place: this.props.data.Place
    })
      .then(json => {
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
    var data = {
      order_id: this.state.orderId,
      price: parseInt(this.props.data.Price),
      email: this.props.data.Email,
      Location: this.props.data.Location,
      firstName: this.props.data.FirstName,
      lastName: this.props.data.LastName,
      phone: this.props.data.Phone,
      movie: this.props.data.Movie,
      id:
        this.props.data.Place +
        this.state.now +
        this.props.data.Phone +
        Math.random(10) * 1000,
      place: this.props.data.Place,
      age: this.props.data.Age,
      type: "Event"
    };
    if (this.state.orderId !== null) {
      this.props.UnAuthEvent(data);
    }
    return (
      <div>
        {this.state.iframe === null
          ? <div>
              <p>Loading...</p>
            </div>
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
    UnAuthEvent: data => dispatch(UnAuthEvent(data))
  };
};
export default connect(null, mapDispatchToProps)(AcceptPayment);
