import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const UnSuccess = props => {
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
        icon={faTimesCircle}
        style={{ fontSize: "-webkit-xxx-large", color: "red" }}
      />
      <br />
      {props.massages.map(x => (
        <span style={{ color: "red", fontSize: "20px" }}>
          {x.replace(/\./g, "")}
          <br />
        </span>
      ))}
    </div>
  );
};

export default UnSuccess;
