import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Success = props => {
  return (
    <div
      className="container"
      style={{
        backgroundColor: "rgba(10,10,10,0.2)",
        textAlign: "center",
        border: "5px #888 light",
        borderRadius: "10%",
        padding: "20%"
      }}
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{ fontSize: "-webkit-xxx-large", color: "green" }}
      />
      <br />
      <span style={{ color: "green", fontSize: "20px" }}>
        {props.massages.map(x => x.replace(/\./g, ""))}
      </span>
    </div>
  );
};

export default Success;
