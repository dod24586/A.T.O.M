import React from "react";
import "./Table.css";
import { pagination } from "./../../pagination";
import Pagnation from "./../CreateEventAccount/Pagnation";
class Table1 extends React.Component {
  state = {
    current: 1,
    data: this.props.data,
    Filter: false,
    Max: 0,
    Min: 0,
    RateMin: 1,
    RateMax: 5,
    dataBackUp: this.props.data,
    SortPrice: true,
    SortRate: true
  };
  handlePageChange = num => {
    this.setState({ current: num });
  };
  FilterByrate = () => {
    let maxPrice = this.state.Max.length > 0 ? true : false;
    let minPrice = this.state.Min.length > 0 ? true : false;
    let maxRate = this.state.RateMax.length > 0 ? true : false;
    let minRate = this.state.RateMin.length > 0 ? true : false;

    const clone = [...this.state.dataBackUp];
    let data = clone.filter(x => {
      if (
        maxPrice &&
        minPrice &&
        maxRate &&
        minRate &&
        (x.Price <= this.state.Max &&
          x.Price >= this.state.Min &&
          x.Rate >= this.state.RateMin &&
          x.Rate <= this.state.RateMax)
      ) {
        ////console.log(
        ////"(x.Price<=this.state.Max && x.Price>=this.state.Min &&x.Rate >= this.state.RateMin&& x.Rate <=  this.state.RateMax)"
        // );
        return true;
      } else if (
        (!maxPrice &&
          !minPrice &&
          maxRate &&
          minRate &&
          x.Rate >= this.state.RateMin &&
          x.Rate <= this.state.RateMax) ||
        (!maxRate &&
          !minRate &&
          maxPrice &&
          minPrice &&
          x.Price <= this.state.Max &&
          x.Price >= this.state.Min)
      ) {
        ////console.log(
        // "(x.Rate >= this.state.RateMin&& x.Rate <=  this.state.RateMax)||(x.Price<=this.state.Max && x.Price>=this.state.Min)"
        //);
        return true;
      } else {
        return false;
      }
    });
    this.setState({ data });
    //console.log(this.state.data);
  };
  SortByPrice = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);
    if (this.state.SortPrice) {
      this.setState({ data: clone, SortPrice: !this.state.SortPrice });
      return;
    }
    clone.reverse();
    this.setState({ data: clone, SortPrice: !this.state.SortPrice });
  };
  SortByRate = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);
    if (this.state.SortRate) {
      this.setState({ data: clone, SortRate: !this.state.SortRate });
      return;
    }
    /* clone.reverse()
      this.setState({data:clone,SortRate:!this.state.SortRate})
*/
  };

  HandleInput = event => {
    /////console.log(event.target.id + " : " + event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  };

  ReSet = () => {
    this.setState({ data: this.state.dataBackUp });
  };
  /*
  onStarClick = (nextValue, prevValue, name) => {
    let clone = [...this.state.data];
    ////console.log(clone);
    clone = clone.map(x => {
      if (name === x.Name) x.Rate = nextValue;
      return { ...x };
    });
    this.setState({ data: clone });
    // //console.log(nextValue, prevValue, name);
    ////console.log(clone);
  };
*/
  render() {
    let AllBooker = pagination(this.props.data, this.state.current, 20);
    //console.log(AllBooker);
    return (
      <div style={{ position: "relative", bottom: "90px" }}>
        {AllBooker && AllBooker.length === 0
          ? <div style={{ textAlign: "center" }}>
              <p>No one to Manage this service right now </p>
            </div>
          : <div className="table-users">
              <div className="header"> All Bookers</div>

              <table cellspacing="0">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tickets no</th>
                  <th>Phone</th>
                  <th>Location</th>
                  {/*<th width="230">Feedback</th>*/}
                </tr>

                {AllBooker &&
                  AllBooker.map(x => {
                    return (
                      <tr>
                        <td>
                          {x.firstname} {x.lastname}
                        </td>
                        <td>
                          {x.email}
                        </td>
                        <td>
                          {x.numberOfTickets}
                        </td>
                        <td>
                          {x.phone}
                        </td>
                        <td>
                          {x.location || "Cairo"}
                        </td>
                      </tr>
                    );
                  })}
              </table>
              <br />
              <Pagnation
                dataCount={this.props.data.length}
                current={this.state.current}
                OnPageChange={this.handlePageChange}
                Size={20}
              />
            </div>}
      </div>
    );
  }
}

export default Table1;
