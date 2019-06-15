import React from "react";
import { fetchStreamers } from "../config/endpoints";
import { liveStreamers } from "../config/endpoints";
import axios from "axios";
import img from "../img/twitch-logo.png";
import img2 from "../img/twitch-logo2.png";
import { Link } from "react-router-dom";
import App from "./App";
import ChannelPage from "./ChannelPage";
import liveCircle from "../img/red-circle.png";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      suggestedChannels: [],
      liveChannels: [],
      liveToShow: 3,
      channelsToShow: 3,
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.displaySuggestedLiveResults = this.displaySuggestedLiveResults.bind(
      this
    );
    this.displaySuggestedResults = this.displaySuggestedResults.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.showMoreLiveChannels = this.showMoreLiveChannels.bind(this);
    this.showMoreChannels = this.showMoreChannels.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
  }

  showMoreChannels() {
    this.state.channelsToShow === 3
      ? this.setState({
          channelsToShow: this.state.suggestedChannels.length
        })
      : this.setState({
          channelsToShow: 3
        });
  }

  showMoreLiveChannels() {
    this.state.liveToShow === 3
      ? this.setState({
          liveToShow: this.state.liveChannels.length
        })
      : this.setState({
          liveToShow: 3
        });
  }

  openMenu() {
    this.setState({ open: !this.state.open });
  }

  // closeMenu() {
  //   this.setState({ open: false }, () => {
  //     document.removeEventListener("click", this.closeMenu);
  //   });
  // }

  handleChange(e) {
    var value = e.target.value;

    this.setState({ input: value, suggestedChannels: [], liveChannels: [] });

    // prevent ajax request from firing if value is empty

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      const endpoint = fetchStreamers(this.state.input);
      const endpoint2 = liveStreamers(this.state.input);
      axios.get(endpoint).then(res => {
        this.setState({
          suggestedChannels: res.data.channels
        });
      });

      axios.get(endpoint2).then(res => {
        this.setState({
          liveChannels: res.data.streams
        });
      });
    }, 600);
  }

  handleReset() {
    this.setState({
      input: "",
      suggestedChannels: [],
      liveChannels: []
    });
  }

  displaySuggestedLiveResults() {
    if (this.state.liveChannels.length > 0) {
      return (
        <ul className="suggested-live-results">
          <div className="channel_live">
            <button onClick={this.showMoreLiveChannels} className="live-button">
              <h6 className="live_list">LIVE</h6>
              {/* <div className="line" /> */}
              <img className="live_circle" src={liveCircle} />
            </button>
            {/* <button className="back-button">Back</button> */}
          </div>
          {this.state.liveChannels
            .slice(0, this.state.liveToShow)
            .map((item, index) => (
              <Link
                onClick={this.handleReset}
                to={{
                  pathname: "/channelpage",
                  state: {
                    suggestedResult: item.channel
                  }
                }}
                key={item._id}
              >
                <div className="suggested-item-container">
                  <img
                    className="suggested-stream-logo"
                    src={item.preview.medium}
                  />
                  <li className="suggested-result">
                    {item.channel.display_name}
                  </li>
                </div>
              </Link>
            ))}
        </ul>
      );
    }
  }

  displaySuggestedResults() {
    if (this.state.suggestedChannels.length > 0) {
      return (
        <ul className="suggestions-menu">
          <button onClick={this.showMoreChannels} className="channels-button">
            <div className="channel_title">
              <h6 className="channels_list">CHANNELS</h6>
              {/* <div className="line" /> */}
            </div>
          </button>
          {this.state.suggestedChannels
            .slice(0, this.state.channelsToShow)
            .map((item, index) => (
              <Link
                onClick={this.handleReset}
                to={{
                  pathname: "/channelpage",
                  state: {
                    suggestedResult: item
                  }
                }}
                key={item._id}
              >
                <div className="suggested-item-container">
                  <img className="suggested-result-logo" src={item.logo} />
                  <li className="suggested-result">{item.display_name}</li>
                </div>
              </Link>
            ))}
          {/* {this.state.suggestedChannels.map(function(item, index) {
            return (
              <Link
                to={{
                  pathname: "/channelpage",
                  state: {
                    suggestedResult: item
                  }
                }}
                key={item._id}
              >
                <div className="suggested-item-container">
                  <img className="suggested-result-logo" src={item.logo} />
                  <li className="suggested-result">{item.display_name}</li>
                </div>
              </Link>
            );
          })} */}
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <a className="home_link" href="/">
            <img className="twitch-logo" src={img} />
            <img className="twitch-logo2" src={img2} />
          </a>
          <div className="menu-container">
            <button className="menu-button" onClick={() => this.openMenu()}>
              <i className="fas fa-bars fa-2x" />
            </button>
          </div>
          <div className="search-box input-container">
            <input
              type="text"
              name="streamer"
              placeholder="Search"
              autoComplete="off"
              className="input"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <button onClick={this.handleReset} className="reset-button">
              <i className="far fa-times-circle fa-2x" />
            </button>
          </div>
        </div>
        <div className="channel_menu">
          {this.displaySuggestedLiveResults()}
          {this.displaySuggestedResults()}
        </div>

        {this.state.open ? (
          <div className="menu">
            <ul>
              <li className="menu-link">
                <a href="/">Home</a>
              </li>
              <li className="menu-link">
                <a href="/categories">Categories</a>
              </li>

              <li>
                <div className="input-container">
                  <input
                    type="text"
                    name="streamer"
                    placeholder="Search"
                    autoComplete="off"
                    className="input"
                    value={this.state.input}
                    onChange={this.handleChange}
                    // reset={this.state.reset}
                  />
                  <i className="far fa-times-circle fa-2x" />
                </div>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Form;
