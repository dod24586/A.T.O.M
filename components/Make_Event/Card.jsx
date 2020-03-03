import React, { Component } from "react";
import { Button, Carousel } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
//import { connect } from "react-redux";

class Card extends Component {
  state = { AllBookedId: [] };
  componentDidMount() {
    //   //console.log(this.props.Booked);
  }

  render() {
    const now = Date.parse(new Date()) / 1000;
    const { data: x, toggleBookingForm, togglePopup } = this.props;
    if (x !== undefined) {
      //   //console.log(x.Place, x);
    } else {
      //let z = x.StartTime.toString();
      // //console.log(z);
    }
    return (
      <div className="w3-show-inline-block">
        {" "}<div className="w3-card-3  w3-border MobileMarge">
          <Carousel
            interval="1000"
            nextIcon={<span />}
            style={{
              height: "16.7rem",
              width: "20.5rem",
              textAlign: "center"
            }}
            prevIcon={<span />}
            pauseOnHover="true"
          >
            {x.Images.map((x, index) =>
              <Carousel.Item key={index}>
                <img src={x} className="card-img-size" alt={x.name} />
              </Carousel.Item>
            )}
          </Carousel>

          <div className="w3-container w3-center w3-white">
            <ul className="w3-ul">
              <li
                style={{
                  borderBottom: "0px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                {x.Name}
              </li>
              <li
                style={{
                  borderBottom: "0px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                {x.Place}
              </li>
              <li
                style={{
                  borderBottom: "0px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                {typeof x.StartTime === typeof ""
                  ? moment(new Date(x.StartTime)).format("Do  MMM  YY")
                  : moment(x.StartTime.toDate()).format("Do  MMM  YY")}{" "}
                -{" "}
                {typeof x.EndTime === typeof ""
                  ? moment(new Date(x.EndTime)).format("Do  MMM  YY")
                  : moment(x.EndTime.toDate()).format("Do  MMM  YY")}
              </li>
              <li
                style={{
                  borderBottom: "0px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                {x.Price} EGP
              </li>
              <li
                style={{
                  borderBottom: "0px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                <StarRatingComponent value={x.Rate} editing={false} />
              </li>
              {x.StartTime.seconds - now > 86400 ||
              Date.parse(new Date(x.StartTime)) / 1000 - now > 86400
                ? <Button
                    variant="primary"
                    onClick={() => toggleBookingForm(x)}
                  >
                    Book Now
                  </Button>
                : <Button variant="secondary
                ">
                    Not Available
                  </Button>}
              <Button variant="danger " onClick={() => togglePopup(x)}>
                More details
              </Button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
