import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import LoginScreen from "./components/LoginScreen/LoginScreen";
/*import Profile from "./components/Account/UserData/Profile";
import MyProfile from "./components/Account/UserData/MyProfile";
import Setting from "./components/Account/UserData/Setting";
import Notification from "./components/Account/UserData/Notifications";
import ForumComments from "./components/Account/UserData/ForumComments";
import ForumPosts from "./components/Account/UserData/ForumPosts";*/
import ComingSoon from "./components/ComingSoon";
import CreateYourEvent from "./components/Make_Event/Option/CreateYourEvent";
import Trips from "./components/Make_Event/Option/Trips";
//import Wedding from "./components/Make_Event/Option/Wedding";
import { Route, Switch as SW, Redirect } from "react-router-dom";
import Atom from "./img/Atom.png";
import Atom_title from "./img/Atom_title.png";
import MakeEvent from "./components/Make_Event/main";
import EventSupplierForm from "./components/EventSupplier/main";
import Arr from "./Make_your_event";
//import UserData from "./components/Account/UserData";
import { connect } from "react-redux";
import MyProfile from "./components/Account/UserData/MyProfile";
import CreateEventAccount from "./components/CreateEventAccount/CreateEventAccount";
import "./App.css";
import Ushers from "./components/Make_Event/Option/Ushers";

/*import OnlinePayment from "./components/Make_Event/Option/OnlinePayment";
import DayUse from "./components/Make_Event/Option/DayUse";
import OnlineTickets from "./components/Make_Event/Option/OnlineTickets";
import WebApp from "./components/Make_Event/Option/WebApp";
import MediaCoverage from "./components/Make_Event/Option/MediaCoverage";
import MarketingServices from "./components/Make_Event/Option/MarketingServices";
import Logistics from "./components/Make_Event/Option/Logistics";
import Sponsors from "./components/Make_Event/Option/Sponsors";
import BadegtingServices from "./components/Make_Event/Option/BudegtingServices";
import Venue from "./components/Make_Event/Option/Venue";
import SurpriseParty from "./components/Make_Event/Option/SurpriseParty";*/

//import Account from "./components/Account/Account";
import BecomeAnUsher from "./components/BecomeAnUsher/main";
import NotFound from "./components/NotFound";
import CheckPayment from "./components/CheckPayment";
import EventSupplier from "./components/Make_Event/Option/EventSupplier";
import EventSupplierAccount from "./components/EventSupplier/EventSupplierAccount";

class App extends React.Component {
  state = {
    arr: Arr
  };

  render() {
    return (
      <div>
        <Navbar
          title="Atom"
          logo={Atom_title}
          img={this.props.img}
          Name={this.props.Name}
        />
        <SW>
          <Route component={CheckPayment} path={"/CheckPayment"} />
          <Route component={MyProfile} path="/Account/CreateEvent" />
          <Route component={MyProfile} path="/Account/MyProfile" />
          <Route component={MyProfile} path="/Account/Notification" />
          <Route component={MyProfile} path="/Account/EditProfile" />
          <Route
            component={EventSupplierAccount}
            path="/EventSupplier/CurrentEvent"
          />
          <Route
            component={EventSupplierAccount}
            path="/EventSupplier/CreateTrip"
          />{" "}
          <Route
            component={EventSupplierAccount}
            path="/EventSupplier/Feedback"
          />
          <Route
            component={CreateEventAccount}
            path="/MakeEvent/Account/:id/About"
          />
          <Route
            component={CreateEventAccount}
            path="/MakeEvent/Account/:id/Feedback"
          />
          <Route
            component={CreateEventAccount}
            path="/MakeEvent/Account/:id/Contact"
          />
          <Route
            component={() => <Contact title="Atom" logo={Atom} />}
            exact
            path="/"
          />
          <Route
            component={() => <Ushers title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/Ushers"
          />
          <Route
            component={() =>
              <CreateYourEvent title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/CreateWholeEvent"
          />
          {/*  <Route
            component={() => (
              <OnlinePayment title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/OnlinePayment"
          />
          <Route
            component={() => <DayUse title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/DayUse"
          />
          <Route
            component={() => (
              <SurpriseParty title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/SurpriseParty"
          />
          <Route
            component={() => <Venue title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/Venue"
          />
          <Route
            component={() => (
              <OnlineTickets title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/OnlineTickets"
          />
          <Route
            component={() => <WebApp title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/WebApp"
          />
          <Route
            component={() => (
              <MarketingServices title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/MarketingServices"
          />
          <Route
            component={() => (
              <Logistics title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/Logistics"
          />
    
          <Route
            component={() => (
              <Sponsors title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/Sponsors"
          />
          <Route
            component={() => (
              <BadegtingServices title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/BudegtingServices"
          />
          <Route
            component={() => (
              <MediaCoverage title="Atom" logo={Atom} x={Atom_title} />
            )}
            path="/MakeEvent/MediaCoverage"
            /> <Route
            component={() =>
              <Wedding title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/Wedding"
          />*/}
          <Route
            component={() => <Trips title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/Trip"
          />
          <Route
            component={() =>
              <EventSupplier title="Atom" logo={Atom} x={Atom_title} />}
            path="/MakeEvent/EventSupplier"
          />
          <Route
            component={() => <LoginScreen title="Atom" logo={Atom} />}
            path="/ForgetPassword"
          />
          <Route
            component={() => <LoginScreen title="Atom" logo={Atom} />}
            path="/Login"
          />
          <Route
            component={() => <LoginScreen title="Atom" logo={Atom} />}
            path="/SignUp"
          />
          <Route
            component={() => <LoginScreen title="Atom" logo={Atom} />}
            path="/ApplyForServices"
          />
          <Route
            component={() =>
              <MakeEvent logo={Atom} title="Atom" data={this.state.arr} />}
            path="/MakeEvent"
          />
          <Route
            component={() => <EventSupplierForm title="Atom" logo={Atom} />}
            path="/EventSupplier"
          />
          <Route
            component={() => <BecomeAnUsher title="Atom" logo={Atom} />}
            path="/BecomeAnUsher"
          />
          <Route component={ComingSoon} path="/ComingSoon" />
          <Route component={NotFound} path="/NotFound" />
          <Redirect to="/NotFound" />
        </SW>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    img: state.img,
    Name: state.Name,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
