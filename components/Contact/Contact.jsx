import React from "react";
import "./Contact.css";
/*import { Link } from "react-router-dom";*/
import { connect } from "react-redux";
import FaceBookLogo from "../../img/34929128_2542370199321677_3462617962773479424_n.png";
import GoogleLogo from "../../img/GoogleLogo.png";
import EventBox from "../EventsBox/EventBox";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
const Contact = props => {
  return (
    <div style={{ Minheight: "100%" }}>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          minHeight: "100%",
          marginBottom: "-50px"
        }}
      >
        <img
          className="rounded mx-auto d-block image-1"
          src={props.logo}
          alt="Atom" /*width="660" height="624" */
        />
        <h1 className="PacificaCondensed">Atomic Your Event</h1>
      </div>
      <div style={{ position: "absolute", width: "100%" }}>
        <div>
          <div
            style={{
              textAlign: "center",
              marginTop: "4%",
              paddingBottom: "50px"
            }}
          >
            {props.data &&
              props.data.map(event =>
                <EventBox data={event} image={event.image || event.Image} />
              )}
          </div>
          <div className="push" />
          <div className="push" />
          <div className="push" />
          <footer
            className="footer"
            style={{
              height: "50px",
              marginTop: "-50px",
              position: "absolute",
              bottom: "0"
            }}
          >
            <p style={{ display: "inline", marginRight: "14px" }}>
              Contact us:
            </p>
            <a href="https://www.facebook.com/ATOMFOREVENTS/" target="blank">
              <img src={FaceBookLogo} alt="Facbook Icon" width="25px" />
            </a>
            <a href="mailto:Atom.community00@gmail.com">
              <img
                src={GoogleLogo}
                width="25px"
                height="25px"
                alt="Google Icon"
              />
            </a>
            <div style={{ color: "white", textAlign: "center" }}>
              © 2019 Atom.inc All Rights Reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.firebase.auth, data: state.firestore.ordered.Event };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Event" }])
)(Contact);
/* <div className="E3btn">
        <div className="card-body text-center d-inline m-4  ">
          <Link to="/EventSupplier" className="card-text" Style="color:white; ">
            Event Supplier
          </Link>
        </div>

        <div className="card-body text-center d-inline m-4 ">
          <Link to="/MakeEvent" className="card-text" Style="color:white; ">
            Make Event
          </Link>
        </div>

        <div className="card-body text-center d-inline m-4 ">
          <Link to="/BecomeAnUsher" className="card-text" Style="color:white; ">
            Become An Usher
          </Link>
        </div>
      </div> */
/*
 {props.auth.uid ? (
        <div className="wrapperNew">
          <p className="mt-4 Contact">Contact us</p>

          <input
            type="text"
            className="form-control d-block  mt-2 form-control-sm"
            Style="background-color:#000"
            placeholder="First Name"
            required=""
          />

          <input
            type="text"
            className="form-control mt-2 form-control-sm"
            Style="background-color:#000"
            placeholder="Second Name"
          />

          <input
            type="tel "
            className="form-control mt-2 form-control-sm"
            Style="background-color:#000"
            placeholder="Phone Number"
          />

          <input
            type="email"
            className="form-control mt-2 form-control-sm"
            Style="background-color:#000"
            placeholder="E-mail"
          />

          <textarea
            rows="4"
            cols="50"
            placeholder="Message"
            className="form-control Message form-control-sm mt-2"
            Style="background-color:#000"
          />

          <input
            type="Submit"
            className="btn btn-danger"
            Style="  background-color:rgba(139, 0, 0, 1); border-color:rgba(139, 0, 0, 1);"
          />
        </div>
      ) : (
        <div />
      )}*/
/*
            <div className="btn btn-danger p-5 pl-5  d-block" Style="width: 25%; background:white;
    float: left;"></div>
    <div Style="clear:both;"></div>
            <div className="btn btn-danger p-5 pl-5  d-block" Style="width: 25%; background:white;
    float: left;"></div>
    <div Style="clear:both;"></div>
            <div className="clear-fix"></div>
            */
