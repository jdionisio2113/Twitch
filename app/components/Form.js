import React from "react";
import { fetchStreamers } from "../config/endpoints";
import axios from "axios";
import img from "../img/twitch-logo.png";
import { Link } from "react-router-dom";
import App from "./App";
// import Menu from "./Example";
// import img from "../img/menu.svg";
// import { slide as Menu } from "react-burger-menu";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      suggestedChannels: [],
      open: false,
      search: false,
      black: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.displaySuggestedResults = this.displaySuggestedResults.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.openMenu = this.openMenu.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    this.setState({ black: !this.state.black });
  }

  openMenu() {
    this.setState({ open: !this.state.open });
  }

  searchMenu() {
    this.setState({ search: !this.state.search });
  }

  // // closeMenu() {
  // //   this.setState({ open: false }, () => {
  // //     document.removeEventListener("click", this.closeMenu);
  // //   });
  // // }

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
      // <form
      //   onSubmit={this.handleChange}
      //   // reset={this.state.reset}
      //   className="form"
      // >
      <div>
        <div className="nav">
          <a href="/">
            <img className="twitch-logo" src={img} />
          </a>
          <div className="menu-container">
            <button className="menu-button" onClick={() => this.openMenu()}>
              <i className="fas fa-bars fa-2x" />
            </button>
          </div>
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
              {/* </ul> */}
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
                  <button onClick={this.handleReset} className="reset-button">
                    <i className="far fa-times-circle fa-2x" />
                  </button>
                </div>
              </li>
            </ul>
            {this.displaySuggestedResults()}
          </div>
        ) : null}
        {/* </div>
        </div> */}
        {/* <div className="nav2-container">
          {this.state.search ? (
            <div className="input-container">
              <div className="search-container">
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
                {this.displaySuggestedResults()}
              </div>
              
            </div>
          ) : null}
          <div className="nav2">
            <a href="/">
              <i className="fas fa-home fa-2x" />
            </a>

            <button className="nav2-search" onClick={() => this.searchMenu()}>
              <i className="fas fa-search fa-2x" />
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Form;
