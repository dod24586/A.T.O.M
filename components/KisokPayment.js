import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAuthToken,
  createOrderRegistration,
  getPaymentKey,
  createKioskPayRequest
} from "../utils/KisokPayment";
import { kisokUnAuthEvent } from "../Redux/Actions/EventAction";

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
      id: this.props.data.Place + now + this.props.data.Phone,
      place: this.props.data.Place,
      type: "Event"
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
    let data = {
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
      type: "Event",
      age: this.props.data.Age,
      KioskId: this.state.billRef
    };
    if (
      this.state.orderId !== null &&
      this.state.billRef !== null &&
      this.state.orderId &&
      this.state.billRef
    ) {
      this.props.kisokUnAuthEvent(data);
    }
    return (
      <div>
        {this.state.billRef === null
          ? <div>Loading...</div>
          : <div>
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
            </div>}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    kisokUnAuthEvent: data => dispatch(kisokUnAuthEvent(data))
  };
};
export default connect(null, mapDispatchToProps)(AcceptPayment);
/*<iframe
                                src={this.state.iframe}
                                width={"100%"}
                                height={"800px"}
                            />*/
