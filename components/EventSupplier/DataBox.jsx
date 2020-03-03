import React from "react";
import "./MyProfile.css";
import { NavLink } from "react-router-dom";
import "./DataBox.css";
import "../w3.css";
import StarRatingComponent from "react-star-rating-component";

const DataBox = props => {
  if (props.data.isEmpty) {
    return (
      <div className="col-md-8">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (props.data.EventData.Apply) {
  }
  //console.log(props.data.EventData);
  return (
    <div className="col-md-8">
      <div
        className="profile-head"
        style={
          props.data.EventData.Apply && props.data.EventData.Apply
            ? { marginTop: "0px" }
            : { marginTop: "60px" }
        }
      >
        <h5 style={{ textAlign: "center" }}>
          {props.data.displayName}{" "}
        </h5>
        {!props.data.EventData.Apply && !props.data.EventData.Apply
          ? <div>
              <h6>
                {props.data.EventData.Website}
              </h6>
              <p className="proile-rating">
                <span>
                  {props.data.EventData.allServices.map(x => {
                    return x.Name === "Trips"
                      ? <StarRatingComponent
                          name={props.data.displayName}
                          value={x.Rate / x.TotalRate}
                          starCount={5}
                          editing={false}
                        />
                      : null;
                  })}
                </span>
              </p>
            </div>
          : <React.Fragment>
              <br />
              <br />
              <br />
            </React.Fragment>}

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {props.data.EventData.allServices.find(x => x.Name === "Trips")
            ? <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    id="home-tab"
                    data-toggle="tab"
                    to="/EventSupplier/CurrentEvent"
                    role="tab"
                    style={{ display: "flex", padding: "10px" }}
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Current Event
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    id="profile-tab"
                    to="/EventSupplier/CreateTrip"
                    data-toggle="tab"
                    role="tab"
                    style={{ display: "flex", padding: "10px" }}
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Create Trip
                  </NavLink>
                </li>
              </React.Fragment>
            : null}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              id="profile-tab"
              to="/EventSupplier/Feedback"
              data-toggle="tab"
              role="tab"
              style={{ display: "flex", padding: "10px" }}
              aria-controls="profile"
              aria-selected="false"
            >
              Feedback
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DataBox;
