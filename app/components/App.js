import React from "react";
import { all, get } from "axios";
import Form from "./Form";
import FeaturedStreams from "./FeaturedStreams";
import TopGames from "./TopGames";
import LiveChannels from "./LiveChannels";
// import Categories from "./Categories";
// var ReactRouter = require("react-router-dom");
// import { Router, Route, Switch,Link } from "react-router";

var apiKey = "t8yaydrbaft3dpp950285vmtcal743";

class App extends React.Component {
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
        {/* <Router>
          <div className="container">
            <Switch>
              <Route path="/categories" component={Categories} />
              <Route
                render={function() {
                  return <p>Not Found</p>;
                }}
              />
            </Switch>
          </div>
        </Router> */}
        <Form />
        <FeaturedStreams featured={this.state.featured} />
        <TopGames games={this.state.games} />
        <LiveChannels channels={this.state.channels} />
        {/* <SearchContainer /> */}
      </div>
    );
  }
}

export default App;
