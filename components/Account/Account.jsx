import React from "react";
import "./Account.css";
import StarRatingComponent from "react-star-rating-component";
import Atom from "../../img/Atom.png";
import arr from "./../../Make_your_event";
const Account = props => {
  return (
    <div className="body">
      <div className="card-container">
        <img
          className="round"
          src={Atom}
          alt="user"
          style={{ width: "44%", height: "35%" }}
        />
        <h3>Ricky Park</h3>
        <h6>New York</h6>
        <StarRatingComponent
          name={"women"}
          value={5}
          starCount={5}
          editing={false}
        />
        <p>
          User interface designer and <br />
          front-end developer
        </p>
        <div className="buttons">
          <button className="primary">Message</button>
          <button className="primary ghost">Rate him</button>
        </div>
        <div className="skills">
          <h6>All Services</h6>
          <ul>
            {arr.map(x => (
              <li>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
