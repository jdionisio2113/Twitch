import React from "react";
import { all, get } from "axios";
import Form from "./Form";
import FeaturedStreams from "./FeaturedStreams";
import TopGames from "./TopGames";
import LiveChannels from "./LiveChannels";
import Categories from "./Categories";
// var ReactRouter = require("react-router-dom");
// import { Router, Route, Switch,Link } from "react-router";
// import { BrowserRouter as Router } from "react-router-dom";
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var apiKey = "t8yaydrbaft3dpp950285vmtcal743";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      featured: [],
      games: [],
      channels: []
    };

    this.twitchData = this.twitchData.bind(this);
    // this.fetchData = this.fetchData.bind(this);
  }

  twitchData(featured, game, channels) {
    all([get(featured), get(game), get(channels)]).then(res => {
      var featured = res[0].data.featured;
      var game = res[1].data.top;
      var channels = res[2].data.streams;

      // console.log(streamers);
      console.log(channels);
      console.log(featured);
      console.log(game);

      this.setState({
        featured: featured
      });

      this.setState({
        games: game
      });

      this.setState({
        channels: channels
      });
    });
  }

  componentDidMount() {
    this.twitchData(
      `https://api.twitch.tv/kraken/streams/featured?client_id=${apiKey}&limit=5`,
      `https://api.twitch.tv/kraken/games/top?client_id=${apiKey}`,
      `https://api.twitch.tv/kraken/streams?client_id=${apiKey}&limit=7`
    );
  }

  render() {
    return (
      <div>
        <FeaturedStreams featured={this.state.featured} />
        <TopGames games={this.state.games} />
        <LiveChannels channels={this.state.channels} />
      </div>
    );
  }
}

// place in /config/routes.js
const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/new"
        // component={Categories}
        render={props => {
          var { games } = props;
          return (
            <div className="categoryMenu">
              {games.map(function(item, index) {
                // console.log(item.game.logo.large);
                return (
                  <div key={index} className="game_container">
                    <img className="logo" src={item.game.box.large} />
                    {/* <h1>{item.game.name}</h1> */}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </Switch>
  </Router>
);

const App = () => {
  return (
    <div>
      <Form />
      {routes}
    </div>
  );
};
export default App;
