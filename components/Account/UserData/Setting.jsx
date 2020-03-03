import React from "react";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import { connect } from "react-redux";

const Setting = props => {
  return (
    <div className="profile-content">
      <h2
        Style="font: normal normal normal 25px/1.4em proxima-n-w01-reg,sans-serif;
    line-height: normal;"
      >
        Notification Settings
      </h2>
      <hr Style="border-color:#2A2A2A;opacity: .2;height:1px;" />
      <div>
        <h6 Style="display: inline-block;">Forum Notifications</h6>
        <h6 Style="display: inline-block;" className="float-right">
          e-mail
        </h6>
        <div className="clearfix" />
        <hr Style="margin:5px 0 20px;border-color:#2A2A2A;opacity: .2;height:1px;" />
        <div>
          <h6>Likes</h6>
          <small>Notify me when members like my posts and comments.</small>
          <FontAwesomeIcon
            icon={props.isLogin ? faToggleOff : faToggleOn}
            onClick={props.Enable}
          />
          <Switch
            checked={props.isLogin}
            onChange={props.Enable}
            id="normal-switch"
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    img: state.img,
    Name: state.Name,
    isLogin: state.isLogin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Enable: () => dispatch({ type: "ENABLE" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
