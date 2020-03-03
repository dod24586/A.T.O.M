import React, { Component } from "react";
import { pagination } from "./../../pagination";
import Pagnation from "./../CreateEventAccount/Pagnation";
class Feedback extends Component {
  state = { current: 1, allFeedback: [] };
  componentDidMount() {
    let allFeedback = this.props.data.Feedback.reverse();
    this.setState({ allFeedback });
  }
  handlePageChange = num => {
    this.setState({ current: num });
  };
  render() {
    let AllFeedback = pagination(
      this.state.allFeedback,
      this.state.current,
      20
    );

    return (
      <div>
        {AllFeedback && AllFeedback.length > 0
          ? AllFeedback.map((x, INDEX) =>
              <div className="w3-card-4 w3-margin-bottom" key={INDEX}>
                <header className="w3-container w3-light-grey">
                  <h3>
                    {x.TripName || null}
                  </h3>
                </header>
                <div className="w3-container">
                  <p />
                  <hr />
                  <p>
                    {x.Feedback}
                  </p>
                  <br />
                </div>
              </div>
            )
          : <h4 style={{ color: " rgb(92, 145, 184)" }}>No Feedback yet</h4>}
        <br />
        <Pagnation
          dataCount={this.props.data.Feedback.length}
          current={this.state.current}
          OnPageChange={this.handlePageChange}
          Size={20}
        />
      </div>
    );
  }
}

export default Feedback;
