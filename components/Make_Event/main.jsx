import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./main.css";
import { connect } from "react-redux";

const Main = props => {
  if (!props.auth.uid) return <Redirect to="/Login" />;

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          width: "11rem",
          margin: "auto",
          bottom: "60px",
          position: "relative",
          minHeight: "100%",
          zIndex: "-1"
        }}
      >
        <img
          className="rounded mx-auto d-block image-1"
          src={props.logo}
          alt="Atom" /*width="660" height="624" */
          style={{ marginTop: "-6%", width: "10rem" }}
        />
        <h1
          className="PacificaCondensed"
          style={{ fontSize: "small", position: "relative", bottom: "50px" }}
        >
          Atomic Your Event
        </h1>
      </div>

      <div className="container">
        <div className="card-columns d-inline-block s4">
          {props.data.map((m, index) => {
            return (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  borderColor: "rgba(0,0,0,0)"
                }}
              >
                <Link
                  to={"/MakeEvent/" + m.replace(/ /g, "")}
                  className="card-text"
                >
                  <div
                    className="card-body text-center"
                    style={{
                      margin: "30px"
                      /*padding: "4.25rem 3.25rem" */
                    }}
                  >
                    {m}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};
export default connect(mapStateToProps)(Main);
