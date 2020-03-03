import React, { Component } from "react";
import { connect } from "react-redux";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatRoom.css";
//import { db } from "../.././config/firebase";
/*import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";*/
import { sendMassages } from "./../../Redux/Actions/ContactAndFeedbackAction";

class ChatRoom extends Component {
  state = { massage: "" };
  sendMassage = e => {
    e.preventDefault();
    this.props.sendMassages(this.state.massage, this.props.ChatRoomId);
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="popup vanish">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <div className="Chatbody">
            <div id="frame">
              <div className="content">
                <div className="contact-profile">
                  <img
                    src={
                      (this.props.allUsers && this.props.allUsers.photoURL) ||
                      "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                    }
                    alt=""
                  />
                  <p>
                    {this.props.Name}
                  </p>
                  <div className="social-media">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={this.props.displayChatRoom}
                    />
                  </div>
                </div>
                <div className="messages">
                  <ul style={{ padding: "0px" }}>
                    {this.props.ChatRoom.data.map((x, index) => {
                      return (
                        <li
                          key={index}
                          className={
                            x.id === this.props.uid ? "sent" : "replies"
                          }
                        >
                          <p>
                            {x.massage}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="message-input">
                  <form onSubmit={this.sendMassage} className="wrap">
                    <input
                      type="text"
                      onChange={this.handleInput}
                      name="massage"
                      value={this.state.massage}
                      placeholder="Write your message..."
                    />

                    <button className="submit">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        onClick={this.sendMassage}
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => {
  //console.log(state.Apply);
  return {
    ChatRoomId: state.Apply.ChatID,
    Name: state.Apply.Name,
    xid: state.Apply.AD,
    img: state.firebase.profile.photoURL,
    uid: state.firebase.auth.uid
  };
};
const mapDispatch = dispatch => {
  return {
    sendMassages: (data, RoomID) => dispatch(sendMassages(data, RoomID))
  };
};
export default connect(mapState, mapDispatch)(ChatRoom);
