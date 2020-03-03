import React from "react";
import "./Contact.css";

const ContactBody = props => {
  return (
    <div className="wrapperNew">
      <div className="form">
        <img src={props.logo} alt={props.title} />

        <input
          type="email"
          className="form-control"
          Style="background-color:#000"
          placeholder="From"
          required=""
          autoFocus=""
        />
        <br />
        <input
          type="email"
          className="form-control"
          Style="background-color:#000"
          placeholder="To"
        />
        <br />
        <textarea
          rows="4"
          cols="50"
          placeholder="Message"
          className="Message"
          Style="background-color:#000"
        />
        <br />
        <input type="Submit" className="btn btn-danger" />
      </div>
    </div>
  );
};

export default ContactBody;
