import React from "react";
import "../MyProfile.css";
import { Acception } from "../../../Redux/Actions/ContactAndFeedbackAction";
import moment from "moment";
import { connect } from "react-redux";
import ChatRoom from "./../ChatRoom";
import { sendChatId } from "../../../Redux/Actions/ContactAndFeedbackAction";
import {
  AddNotifications,
  RemoveNotification,
  BecomeEventSupplier,
  UpdateNotification,
  RefuseEventSupplier
} from "../../../Redux/Actions/ContactAndFeedbackAction";
import { pagination } from "../../../pagination";
import Pagnation from "../../CreateEventAccount/Pagnation";
//import CreateTripForm from "../CreateTripForm";
import { toastr } from "react-redux-toastr";
import ReportFeedback from "./ReportFeedback";
import { db } from "../../../config/firebase";

const mapDispatchToProps = dispatch => {
  return {
    Acception1: data => dispatch(Acception(data)),
    sendIdToState: (id, name, xid) => dispatch(sendChatId(id, name, xid)),
    AddNotifications: () => dispatch(AddNotifications()),
    RemoveNotification: (data, Chatdata) =>
      dispatch(RemoveNotification(data, Chatdata)),
    BecomeEventSupplier: data => dispatch(BecomeEventSupplier(data)),
    UpdateNotification: data => dispatch(UpdateNotification(data)),
    RefuseEventSupplier: data => dispatch(RefuseEventSupplier(data))
  };
};
class Notifications extends React.Component {
  state = {
    current: 1,
    data: null,
    displayCreateForm: false,
    displayFeedback: false,
    notif: null,
    link: ""
  };
  Acception = (e, Accept, userId) => {
    e.preventDefault();
    let data = { Accept, userId };
    this.props.Acception1(data);
  };
  UNSAFE_componentWillMount() {
    if (this.props.data.notifications) {
      //let reverse = this.props.data.notifications;
      let now = Date.parse(new Date()) / 1000;
      let allChatId = [];
      let lengthBefore = this.props.data.notifications.length;
      let allNotifications = this.props.data.notifications.filter(data => {
        if (now - data.date.seconds > 5120560) {
          if (data.ChatRoomId) {
            allChatId = [...allChatId, data.ChatRoomId];
          }
          if (
            data.Type === "Pending" &&
            !data.Feedback &&
            data.PendingPayment
          ) {
            return true;
          }
          return false;
        } else {
          return true;
        }
      });
      if (lengthBefore > allNotifications.length) {
        this.props.RemoveNotification(allNotifications, allChatId);
        //////console.log(allNotifications, allChatId);
      }
      if (this.props.moreData) {
        allNotifications = allNotifications.map(x => {
          if (x.Type === "EventSupplier") {
            if (this.props.moreData.Accept && this.props.moreData.Check) {
              /*  this.props.UpdateNotification({
                ...x,
                Accept: this.props.moreData.Accept,
                Check: this.props.moreData.Check
              });*/
              ////console.log(x);
              return {
                ...x,
                Accept: this.props.moreData.Accept,
                Check: this.props.moreData.Check
              };
            } else if (
              !this.props.moreData.Accept &&
              this.props.moreData.Check
            ) {
              /* this.props.UpdateNotification({
                ...x,
                Accept: this.props.moreData.Accept,
                Check: this.props.moreData.Check
              });*/
              //this.props.RefuseEventSupplier();
              return {
                ...x,
                Accept: this.props.moreData.Accept,
                Check: this.props.moreData.Check
              };
            }
          }
          return { ...x };
        });
      }

      allNotifications = allNotifications.reverse();
      this.setState({ data: allNotifications });
    } else if (
      this.props.data.notifications === undefined &&
      this.props.data.isLoaded
    ) {
      this.props.AddNotifications();
    }

    //this.setState({ Clonedata: this.props.user.Feedback });
  }
  displayChatRoom = (ChatRoom, Name, id) => {
    this.props.sendIdToState(ChatRoom, Name, id);
  };
  sendDatatoState = data => {
    this.setState({ notif: data });
    this.displayFeedback();
  };
  displayFeedback = () => {
    this.setState({ displayFeedback: !this.state.displayFeedback });
  };
  handlePageChange = num => {
    this.setState({ current: num });
  };
  generateLink = x => {
    var z;
    db.collection("uncompletePayment").doc(x.OrderId).get().then(x => {
      z = x.data().Link;
      this.setState({ link: z });
    });
  };
  render() {
    if (this.props.data.notifications === undefined) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.props.data.notifications.length === 0) {
      return <p>No Notifications</p>;
    }
    let AllNotification = pagination(this.state.data, this.state.current, 4);

    return (
      <div>
        <ul className="w3-ul" style={{ textAlign: "left" }}>
          {AllNotification &&
            AllNotification.map((x, index) =>
              <li key={index} style={{ backgroundColor: "aliceblue" }}>
                <h5 style={{ color: "#0062cc" }}>
                  {x.Name} {x.Place || x.Services}
                </h5>
                {x.Type === "AskForServices"
                  ? <React.Fragment>
                      {x.Check
                        ? <small>
                            {x.Accept
                              ? <React.Fragment>
                                  <p style={{ color: "green", margin: "0px" }}>
                                    Accepted
                                  </p>
                                  <p style={{ margin: "0px" }}>
                                    Chat Room Link :
                                    <span
                                      onClick={() =>
                                        this.displayChatRoom(
                                          x.ChatRoomId,
                                          x.Name,
                                          x.ApplyId
                                        )}
                                    >
                                      Go
                                    </span>
                                  </p>
                                </React.Fragment>
                              : <p style={{ color: "red" }}>Refused</p>}
                          </small>
                        : <small>Waiting Acception....</small>}
                    </React.Fragment>
                  : null}
                {x.Type === "EventSupplier"
                  ? <React.Fragment>
                      {x.Check
                        ? <small>
                            {x.Accept
                              ? <React.Fragment>
                                  <p style={{ color: "green", margin: "0px" }}>
                                    Accepted
                                  </p>
                                  <p style={{ margin: "0px" }}>
                                    Let's Start:
                                    <span
                                      onClick={() => {
                                        this.props.BecomeEventSupplier(
                                          this.state.data
                                        );

                                        toastr.success(
                                          "Go to Event Supplier Now to Start"
                                        );
                                      }}
                                    >
                                      Go
                                    </span>
                                  </p>
                                </React.Fragment>
                              : <p
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    this.props.RefuseEventSupplier(
                                      this.state.data
                                    );
                                  }}
                                >
                                  Refused Click For one more try
                                </p>}
                          </small>
                        : <React.Fragment>
                            {this.props.data.EventData
                              ? <p>You are now Event Supplier</p>
                              : <small>Waiting Acception....</small>}
                          </React.Fragment>}
                    </React.Fragment>
                  : null}
                {x.Type === "Services"
                  ? <React.Fragment>
                      <small>
                        {x.Name}
                      </small>
                      <details>
                        <summary>More Details</summary>
                        <h5>
                          Description: <p>{x.Description}</p>
                        </h5>
                      </details>
                      {x.Check
                        ? <span>
                            {x.Accept
                              ? <p style={{ margin: "0px" }}>
                                  Chat Room Link :
                                  <span
                                    onClick={() =>
                                      this.displayChatRoom(
                                        x.ChatRoomId,
                                        x.Name,
                                        x.userId
                                      )}
                                  >
                                    Go
                                  </span>
                                </p>
                              : <p>Has Been Canceled</p>}
                          </span>
                        : <React.Fragment>
                            <button
                              className="btn btn-success"
                              onClick={e => this.Acception(e, true, x.userId)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={e => this.Acception(e, false, x.userId)}
                            >
                              Cancel
                            </button>
                          </React.Fragment>}
                    </React.Fragment>
                  : null}
                {x.Type === "Pending"
                  ? <small>
                      Payment :{" "}
                      {x.PendingPayment && x.Massage !== ""
                        ? <span style={{ color: "green" }}>
                            Booked{x.Xid === this.props.UserID
                              ? null
                              : <React.Fragment>
                                  {x.Feedback === false &&
                                  x.EndTime <= Date.parse(new Date()) / 1000
                                    ? <p
                                        onClick={() => this.sendDatatoState(x)}
                                      >
                                        Report feedback
                                      </p>
                                    : <React.Fragment>
                                        {x.EndTime && x.Feedback === true
                                          ? <p>Thanks for your feedback</p>
                                          : <p style={{ color: "red" }}>
                                              Don't forget to rate and feedback
                                            </p>}
                                      </React.Fragment>}
                                </React.Fragment>}
                          </span>
                        : <React.Fragment>
                            <span style={{ color: "red" }}>Failed</span>
                            {/*<React.Fragment>
                            {x.Massage === ""
                              ? <span>
                                  Complete payment
                                  <a
                                    target="blank"
                                    onClick={() => this.generateLink(x)}
                                    href={this.state.link}
                                  >
                                    go
                                  </a>
                                </span>
                              : <span style={{ color: "red" }}>Failed</span>}
                </React.Fragment>*/}
                          </React.Fragment>}
                    </small>
                  : null}
                <small style={{ display: "block" }}>
                  {moment(x.date.toDate()).fromNow("hh")}
                </small>
              </li>
            )}
        </ul>
        <br />
        {this.state.DisplayPopUp
          ? <ChatRoom
              displayChatRoom={this.displayChatRoom}
              ChatRoom={this.props.allChatRoom.find(
                x => x.id === this.props.ChatRoom
              )}
              allUsers={this.props.allUsers.find(
                x => x.id === this.props.xid || x.id === this.props.xid
              )}
              Name={this.props.Name}
            />
          : null}
        {this.state.displayFeedback
          ? <ReportFeedback
              displayFeedback={this.displayFeedback}
              data={this.state.notif}
            />
          : null}
        {!this.state.displayFeedback && !this.state.DisplayPopUp
          ? <Pagnation
              dataCount={this.state.data.length}
              current={this.state.current}
              OnPageChange={this.handlePageChange}
              Size={4}
            />
          : null}
      </div>
    );
  }
}
const mapState = state => {
  return {
    DisplayPopUp: state.Apply.DisplayPopUp,
    xid: state.Apply.AD,
    ChatRoom: state.Apply.ChatID
  };
};

export default connect(mapState, mapDispatchToProps)(Notifications);
