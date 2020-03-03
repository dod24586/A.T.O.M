import React from "react";
import "./table.css";
//import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

class Table1 extends React.Component {
  state = {
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
    return (
      <div style={{ position: "relative", bottom: "90px" }}>
        {this.props.data && this.props.data.length === 0
          ? <div style={{ textAlign: "center" }}>
              <p>No one to Manage this service right now </p>
            </div>
          : <div className="table-users">
              <div className="header">Users</div>

              <table cellspacing="0">
                <tr>
                  <th>Company Logo</th>
                  <th>Avarger Time</th>
                  <th>Avarger Price</th>
                  <th colSpan="2">Rate</th>
                  {/*<th width="230">Feedback</th>*/}
                </tr>

                {this.props.data &&
                  this.props.data.map(x => {
                    return (
                      <tr>
                        <td>
                          <Link
                            to={{
                              pathname: `/MakeEvent/Account/${x.id}/About`,
                              data: this.props.data,
                              ApplyType: this.props.ApplyType.replace(/ /g, "")
                            }}
                            style={{ color: "#000" }}
                          >
                            <img
                              src={
                                x.photoURL ||
                                "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                              }
                              className="table-img"
                              alt={x.CompanyName}
                            />
                            <small className="SmallName">
                              {x.displayName}
                            </small>
                          </Link>
                        </td>
                        <td>
                          {
                            x.allServices.find(
                              y => this.props.ApplyType === y.Name
                            ).AvgTime
                          }
                        </td>
                        <td>
                          {
                            x.allServices.find(
                              y => this.props.ApplyType === y.Name
                            ).AvgPrice
                          }
                        </td>
                        <td colspan="2">
                          <StarRatingComponent
                            name={x.CompanyName}
                            value={
                              x.allServices.find(
                                y => this.props.ApplyType === y.Name
                              ).Rate /
                              x.allServices.find(
                                y => this.props.ApplyType === y.Name
                              ).TotalRate
                            }
                            starCount={5}
                            editing={false}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>}
      </div>
    );
  }
}

export default Table1;

/*
            <Table striped hover borderless="true" responsive="xl"  variant="dark" className="container Table" Style="padding:0;">
         <thead className="TableHeader" >
            <tr >
            <th >Company</th>
            <th >Avarger Time</th>
            <th onClick={this.SortByPrice}>Price</th>
            <th onClick={this.SortByRate}>Rate</th>
            </tr>
         </thead>
         <tbody>
            {this.props.data.map(x=>      
           
            (<tr >

            <td className="navbar-brand" Style="    margin: 14px 3px;"><Link to={{pathname:"/MakeEvent/CreateWholeEvent/"+x.Name,logo:x.logo}}><img src={x.logo} className="companyLogo" alt={x.Name}/><small>{x.Name}</small></Link></td>
            <td  Style="padding: 4%;">{x.Name}</td>
            <td Style="padding: 4%;" >{x.Price}</td>
            <td Style="padding: 4%;" ><StarRatingComponent name={x.Name} value={x.Rate} starCount={5} editing={false}/></td>
            </tr>
            )
         
         
            )   
}

      

         </tbody>
         </Table>*/
/*          <div className="size container">
            <Button
              variant="secondary"
              Style="float:left;"
              onClick={() => this.setState({ Filter: !this.state.Filter })}
            >
              Filter
            </Button>
            <div Style="clear:both" />
            <div Style={this.state.Filter ? "display:block;" : "display:none"}>
              <label Style="Color:#fff; float:left;">Price Range:</label>
              <input
                id="Min"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="0"
                placeholder="Min"
              />
              <input
                id="Max"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="1"
                placeholder="Max"
              />
              <div Style="clear:both" />
              <label Style="Color:#fff; float:left;">Rate Range:</label>
              <input
                id="RateMin"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="0"
                placeholder="Min"
              />
              <input
                id="RateMax"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="1"
                placeholder="Max"
              />
              <Button
                variant="secondary"
                Style="float:left;"
                onClick={this.FilterByrate}
              >
                Done
              </Button>
              <Button
                variant="secondary"
                Style="float:left;"
                onClick={this.ReSet}
              >
                Reset
              </Button>
            </div>*/
