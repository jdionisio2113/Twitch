import React from "react";
import { fetchStreamers } from "../config/endpoints";
import axios from "axios";
import img from "../img/twitch-logo.png";
import { Link } from "react-router-dom";

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
    this.handleReset = this.handleReset.bind(this);
  }

  // 1) Detect when user is done typing

  // 2) When user is done typing, contact API with user input

  // 3) After we receive the JSON response, display the results to the user

  handleChange(e) {
    var value = e.target.value;

    this.setState({ input: value, suggestedChannels: [] });

    // prevent ajax request from firing if value is empty

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      const endpoint = fetchStreamers(this.state.input);
      axios.get(endpoint).then(res => {
        this.setState({ suggestedChannels: res.data.channels });
        console.log(res.data.channels);
      });
    }, 600);
  }

  handleReset() {
    this.setState({
      input: "",
      suggestedChannels: []
    });
  }

  displaySuggestedResults() {
    if (this.state.suggestedChannels.length > 0) {
      return (
        <ul className="suggestions-menu">
          {this.state.suggestedChannels.map(function(item) {
            return (
              <div key={item._id} className="suggested-item-container">
                <a href={item.url} target="_blank">
                  <img className="suggested-result-logo" src={item.logo} />
                  <li className="suggested-result">{item.display_name}</li>
                </a>
              </div>
            );
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
        <div className="nav">
          <a href="/">
            <img className="twitch-logo" src={img} />
          </a>

          <input
            type="text"
            name="streamer"
            placeholder="Search streamer"
            autoComplete="off"
            className="input"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <input
            type="button"
            name="cancelCourse"
            value="Cancel"
            onClick={this.handleReset}
          />
          {/* <button onClick={this.handleReset}>
            <i class="fa fa-window-close" aria-hidden="true" />
          </button> */}
          {/* <button type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button> */}
          {this.displaySuggestedResults()}
        </div>
      </form>
    );
  }
}

export default Form;
