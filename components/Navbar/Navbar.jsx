import React from "react";
import "./Navbar.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { SignOut } from "./../../Redux/Actions/AuthActions";
class CustomToggle extends React.Component {
  state = {};
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}
const CustomMenu = props => {
  return (
    <div
      style={props.style}
      className={props.className}
      aria-labelledby="aria-labelledby"
    >
      <ul className="list-unstyled">
        {React.Children.toArray(props.children)}
      </ul>
    </div>
  );
};

const NavBar = props => {
  return (
    <div className="mb-2">
      <Navbar
        collapseOnSelect
        bg=""
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        <Navbar.Toggle as={CustomToggle} aria-controls="responsive-navbar-nav">
          <Navbar.Brand>
            <div className="logo">
              <img
                className="brand App-logo"
                src={props.logo}
                alt={props.title}
              />
            </div>
          </Navbar.Brand>
          <FontAwesomeIcon
            className="icon"
            icon={faBars}
            style={{ color: "#000", fontSize: "x-large" }}
          />
        </Navbar.Toggle>
        <Nav>
          {props.auth.uid
            ? <React.Fragment>
                <Nav
                  style={{
                    position: "absolute",
                    right: "1%",
                    top: "17px"
                  }}
                >
                  <Dropdown alignRight={true}>
                    <Dropdown.Toggle
                      className="navbar-right"
                      as={CustomToggle}
                      id="dropdown-menu-align-right"
                    >
                      {" "}<ul
                        className="nav navbar-nav navbar-right"
                        style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
                      >
                        <li>
                          <div className="inset">
                            <img
                              src={
                                props.uploadNewImage.url ||
                                props.auth.photoURL ||
                                "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                              }
                              alt={props.auth.displayName}
                            />
                          </div>
                        </li>
                      </ul>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      as={CustomMenu}
                      style={{ position: "absolute" }}
                    >
                      <Dropdown.Item>
                        <Link
                          to="/Account/MyProfile"
                          style={{
                            color: "#f5f5f5",
                            fontFamily: "sans-serif"
                          }}
                        >
                          My Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          to="/Account/Notification"
                          style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
                        >
                          Notifications
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <Link
                          onClick={props.SignOut}
                          to="/"
                          style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
                        >
                          Log Out
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </React.Fragment>
            : <Nav style={{ position: "absolute", right: "7px", top: "17px" }}>
                <Link
                  to="/Login"
                  className="nav-link d-inline navbar-right"
                  style={{
                    color: "#f5f5f5",
                    fontFamily: "sans-serif",
                    border: "none"
                  }}
                >
                  <FontAwesomeIcon className="login-icon" icon={faUserCircle} />
                  Login
                </Link>
              </Nav>}
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav>
              <Link
                to="/"
                className="nav-link d-inline"
                style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
              >
                Home
              </Link>
            </Nav>{" "}
            <Nav>
              <Link
                to="/MakeEvent"
                className="nav-link d-inline"
                style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
              >
                Make an Event
              </Link>
            </Nav>{" "}
            <Nav>
              <Link
                to="/EventSupplier"
                className="nav-link d-inline"
                style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
              >
                Event Supplier
              </Link>
            </Nav>{" "}
            <Nav>
              <Link
                to="/BecomeAnUsher"
                className="nav-link d-inline"
                style={{ color: "#f5f5f5", fontFamily: "sans-serif" }}
              >
                Become An Usher
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    uploadNewImage: state.Apply
  };
};
const mapDispatchToProps = dispatch => {
  return { SignOut: () => dispatch(SignOut()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

export { CustomMenu };

export { CustomToggle };
/*

 <ul  className="topnav" id="myTopnav">   
            <div className=" logo ">
            <Link to="/"className="nav-link d-inline"> <img src={props.logo}  alt= {props.title}/></Link>
            </div>
            <Link to={props.Check?"/MakeEvent":"/Login"} className="nav-link d-inline">Make Event</Link>
            <Link to={props.Check?"/EventSupplier":"/Login"}className="nav-link d-inline">Event Supplier</Link>
            
            <Link to={props.Check?"BecomeAnUsher":"/Login"} className="nav-link d-inline">Become An Usher</Link>
            <Link to="/Login"className="nav-link d-inline"><FontAwesomeIcon className="login-icon" icon={faUserCircle}/>Login</Link>
        </ul>




*/
