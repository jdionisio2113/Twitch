import React from "react";
import { fetchStreamers } from "../config/endpoints";
import axios from "axios";
import Suggestions from "./Suggestions";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      suggestedChannels: []
    };

    // this.timeout = 0;

    this.handleChange = this.handleChange.bind(this);
    this.displaySuggestedResults = this.displaySuggestedResults.bind(this);
  }

  // 1) Detect when user is done typing

  // 2) When user is done typing, contact API with user input

  // 3) After we receive the JSON response, display the results to the user

  handleChange(e) {
    var value = e.target.value;

    this.setState({ input: value });

    // prevent ajax request from firing if value is empty

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      const endpoint = fetchStreamers(this.state.input);
      axios.get(endpoint).then(res => {
        this.setState({ suggestedChannels: res.data.channels });
        console.log(res.data.chnnels);
        t;
      });
    }, 1000);
  }

  displaySuggestedResults() {
    if (this.state.suggestedChannels.length > 0) {
      return (
        <ul>
          {this.state.suggestedChannels.map(function(item) {
            return <li key={item._id}>{item.display_name}</li>;
          })}
        </ul>
      );
    } else {
      return null;
    }
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
          {this.displaySuggestedResults()}
        </div>
      </form>
    );
  }
}

export default Form;
