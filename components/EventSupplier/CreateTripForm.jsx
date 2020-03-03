import React, { Component } from "react";
import { storage } from "../../config/firebase";
/*import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";*/
import { connect } from "react-redux";
import { CreateTrip } from "../../Redux/Actions/TripsActions";
import { toastr } from "react-redux-toastr";
import { Redirect } from "react-router-dom";
/*import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}*/
// adding descripition
class CreateTripForm extends Component {
  state = {
    Company: this.props.data.displayName,
    Location: "",
    StartTime: "",
    EndTime: "",
    Price: 0,
    Rate: this.props.TotalRate.Rate / this.props.TotalRate.TotalRate,
    Images: [],
    image: null,
    url: "",
    Description: "",
    CountImage: 0,
    progress: 0
  };
  componentDidMount() {
    if (this.props.data.allServices.find(x => x.Name === "Trips")) {
      let index = this.props.data.allServices.findIndex(
        x => x.Name === "Trips"
      );
      var Rate =
        this.props.data.allServices[index].Rate /
        this.props.data.allServices[index].TotalRate;
      this.setState({ Rate });
      //console.log(this.state);
    }
  }
  handleInput = e => {
    //console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
    ////console.log(this.state);
  };
  OnSubmit = e => {
    e.preventDefault();
    ////console.log(this.state.CountImage, this.state.Images.length);
    if (this.state.CountImage === this.state.Images.length) {
      this.props.CreateTrip(this.state);
      toastr.success("Wait for Premission");
    }
  };
  handlingChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      let name = this.state.Company + this.state.Location + this.state.EndTime;
      this.setState(() => ({ image }));
      let clone = this.state.CountImage;
      clone++;
      this.setState({ CountImage: clone });
      const uploadTask = storage.ref(`${name}/images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );

          this.setState({ progress });
        },
        error => {
          // error function ....
          toastr.error(error);
        },
        () => {
          // complete function ....
          storage
            .ref(`${name}/images`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              let Images = [...this.state.Images];
              Images.push(url.toString());
              this.setState({ Images });
              //console.log(this.state.Images);

              // this.props.UploadImageToNav(url);
              // this.props.ProfileImage(url, this.props.auth.uid);
            });
        }
      );
    }
  };
  render() {
    if (!this.props.data.allServices.find(x => x.Name === "Trips")) {
      return <Redirect to="/EventSupplier" />;
    }
    return (
      <div style={{ backgroundColor: "aliceblue", paddingTop: "10px" }}>
        <form onSubmit={e => this.OnSubmit(e)}>
          <div className="BookingForm" style={{ width: "75%" }}>
            <input
              placeholder="Location"
              name="Location"
              type="text"
              style={{ color: "black" }}
              className="w3-input"
              onChange={e => this.handleInput(e)}
              required
            />

            <input
              placeholder="Price"
              name="Price"
              type="number"
              style={{ color: "black" }}
              className="w3-input"
              onChange={e => this.handleInput(e)}
              required
            />
            <br />

            <label style={{ color: "black" }}>Start Date and Time</label>
            <input
              placeholder="Start Time"
              name="StartTime"
              type="datetime-local"
              className="w3-input"
              required
              style={{ color: "black" }}
              onChange={e => this.handleInput(e)}
            />
            <br />
            <label style={{ color: "black" }}>End Date and Time</label>
            <input
              placeholder="End Time"
              name="EndTime"
              type="datetime-local"
              onfocus={(this.type = "date")}
              style={{ color: "black" }}
              className="w3-input"
              onChange={e => this.handleInput(e)}
              required
            />

            <textarea
              name="Description"
              onChange={e => this.handleInput(e)}
              rows="4"
              className="w3-input"
              style={{ color: "black" }}
              cols="50"
              placeholder="Description"
            />
            <h6 style={{ color: "red", fontFamily: "sans-serif" }}>
              Note : Can be HTML tags
            </h6>
            <br />
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                name="Image"
                aria-describedby="inputGroupFileAddon01"
                onChange={e => this.handlingChangeImage(e)}
              />
              <label
                className="custom-file-label"
                style={{ textAlign: "left" }}
                for="inputGroupFile01"
              >
                Choose file
              </label>
            </div>

            <br />

            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={this.state.progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: this.state.progress + "%" }}
              >
                {this.state.progress < 100
                  ? <span>
                      {this.state.progress}%
                    </span>
                  : <span>100% Completed</span>}
              </div>
            </div>
          </div>
          {this.state.progress === 100 ? <p>Add Other Image</p> : null}

          <button className="btn btn-primary btnSubmit BookingForm">
            Publish
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    CreateTrip: data => dispatch(CreateTrip(data))
  };
};
export default connect(null, mapDispatch)(CreateTripForm);
/*            <input
              placeholder="Company"
              name="Company"
              type="text"
              style={{ color: "black" }}
              className="w3-input"
              onChange={e => this.handleInput(e)}
              required
            />*/
