import React, { Component } from "react";
import Success from "./PaymentsResult/Success";
import UnSuccess from "./PaymentsResult/UnSuccess";
import { connect } from "react-redux";
import { gettingResult } from "../Redux/Actions/EventAction";
//import { db } from "../config/firebase";
import { Redirect } from "react-router-dom";

class CheckPayment extends Component {
  state = { data: {} };
  /*handleSecure = data => {
    let Vip = db.collection("allCard").doc(`${data.order}`);
    Vip.get().then(async doc => {
      ///code
      try{        
      let currentData = doc.data(); //all data inside collection
      //console.log(currentData)

      if (currentData) {
      this.setState({redirect:false});
      } else {
        this.setState({redirect:true});      }}
      catch{this.setState({redirect:true});  }
    });
  };*/

  render() {
    // if(this.state.redirect)
    // {
    //   return <Redirect to="/NotFound" />;

    // }
    var fullLink = this.props.location.search.replace(/[?&]/g, " ");
    let Link = this.props.location.search;
    ///([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g

    var order, success, massage;

    fullLink.split(" ").sort().map(x => {
      if (x.substring(0, 6) === "order=") return (order = x);
      if (x.substring(0, "data.message=".length) === "data.message=")
        return (massage = x);
      if (x.substring(0, 8) === "success=") return (success = x);
      return 0;
    });
    ///CheckPayment?data.message=Approved&has_parent_transaction=false&order=4008481&profile_id=4450&amount_cents=50000&acq_response_code=00&is_auth=false&is_capture=false&error_occured=false&is_voided=false&is_void=false&is_standalone_payment=true&refunded_amount_cents=0&source_data.sub_type=Visa&currency=EGP&pending=false&hmac=a7b1a59b1f877a7adcb62f2052cbaf8e524eea4da9225db1f6f1900a62f5293979a797cd2e4015dc272cf3a3b10e7b0d61816045fb8b1e87dfd98a45f436edd6&merchant_order_id=sdaffCairo157599702912345678912984.0131458951524&owner=5027&success=true&source_data.pan=8769&captured_amount=0&id=1892941&is_refund=false&source_data.type=card&created_at=2019-12-10T18%3A57%3A23.815654&integration_id=7209&is_refunded=false&is_3d_secure=true&txn_response_code=0
    massage = massage
      .slice(massage.indexOf("data.message") + "data.message".length + 1)
      .replace(/\+/g, " ")
      .split(". ");
    order = Number(order.slice(order.indexOf("order") + "order".length + 1));
    success = JSON.parse(
      success.slice(success.indexOf("success") + "success".length + 1)
    );

    let data = { order, success, massage, Link };

    this.props.gettingResult(data);
    if (this.props.redirect && !this.props.done) {
      return <Redirect to="/NotFound" />;
    }
    return (
      <div>
        {!this.props.done
          ? <div style={{ textAlign: "center" }}>
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <br />
              <span style={{ color: "white", fontSize: "20px" }}>
                Getting Result Please Wait ....
              </span>
            </div>
          : <React.Fragment>
              {data.success ? <Success massages={data.massage} /> : null}
              {!data.success ? <UnSuccess massages={data.massage} /> : null}
            </React.Fragment>}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    gettingResult: data => dispatch(gettingResult(data))
  };
};
const mapStateToProps = state => {
  return { done: state.trips.done, redirect: state.trips.redirect };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckPayment);
//?source_data.type=card&is_capture=false&profile_id=4450&refunded_amount_cents=0&order=3814483&success=true&is_void=false&is_refund=false&is_refunded=false&source_data.sub_type=Visa&txn_response_code=0&is_3d_secure=true&is_standalone_payment=true&amount_cents=798000&captured_amount=0&error_occured=false&currency=EGP&hmac=ab0acc96360c53dd011d5c60d96851f8b13aabc093802f665dcec27dec7d1b49ec3ecad280550b8c1453a292893ea4e873b2810f204c2f6f469859bb7a2d31b4&acq_response_code=00&is_auth=false&owner=5027&has_parent_transaction=false&id=1728055&source_data.pan=8769&created_at=2019-11-07T17%3A02%3A03.250762&pending=false&is_voided=false&integration_id=7209&merchant_order_id=XYZalex&data.message=Approved.
