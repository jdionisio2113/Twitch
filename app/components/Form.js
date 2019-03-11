import React from "react";
import { fetchStreamers } from "../config/endpoints";
import axios from "axios";
// import Suggestions from "./Suggestions";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: []
    };

    this.timeout = 0;

    this.handleChange = this.handleChange.bind(this);
    // this.changeName = this.changeName.bind(this);
  }

  // 1) Detect when user is done typing

  // 2) When user is done typing, contact API with user input

  // 3) After we receive the JSON response, display the results to the user

  handleChange(e) {
    var value = e.target.value;

    this.setState(function() {
      return {
        input: value
      };
    });

    // console.log(value);

    const endpoint = fetchStreamers(value);

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
      axios.get(endpoint).then(res => {
        // console.log(res.data.channels);
        // var value = res.data.channels.display_name;
        {
          res.data.channels.map(function(item) {
            console.log(item.display_name);
            // return (
            //   <div>
            //     <ul>
            //       <li>{item.display_name}</li>
            //     </ul>
            //   </div>
            // );
          });
        }
      });
    }, 600);
  }

  render() {
    return (
      <form onSubmit={this.handleChange} className="form">
        <div className="search-input">
          <input
            type="text"
            name="streamer"
            placeholder="Search streamer"
            autoComplete="off"
            className="input"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
          {/* <Suggestions input={this.state.input} /> */}
        </div>
      </form>
    );
  }
}

export default Form;
