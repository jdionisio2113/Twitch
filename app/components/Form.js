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
      // reset: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.displaySuggestedResults = this.displaySuggestedResults.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

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
    // this.setState({ reset: true });

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
    // var handleReset = this.state.reset;

    // if (handleReset === true) {
    //   return <Reset />;
    // }
    return (
      // <form
      //   onSubmit={this.handleChange}
      //   // reset={this.state.reset}
      //   className="form"
      // >
      <div className="nav form">
        <a href="/">
          <img className="twitch-logo" src={img} />
        </a>
        <div className="input-container">
          <input
            type="text"
            name="streamer"
            placeholder="Search streamer"
            autoComplete="off"
            className="input"
            value={this.state.input}
            onChange={this.handleChange}
            // reset={this.state.reset}
          />

          <button onClick={this.handleReset} className="reset-button">
            <i class="fa fa-times-circle" aria-hidden="true" />
          </button>
        </div>
        {this.displaySuggestedResults()}
      </div>
      // </form>
    );
  }
}

export default Form;
