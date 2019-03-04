var React = require("react");
var axios = require("axios");
var Form = require("./Form");
var FeaturedStreams = require("./FeaturedStreams");
var TopGames = require("./TopGames");
var LiveChannels = require("./LiveChannels");

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
    this.fetchData = this.fetchData.bind(this);
  }

  twitchData(featured, game, channels) {
    axios
      .all([axios.get(featured), axios.get(game), axios.get(channels)])
      .then(res => {
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

  fetchData(e) {
    e.preventDefault();
    const streamer = e.target.elements.streamer.value;

    axios
      .get(
        `https://api.twitch.tv/kraken/search/channels?client_id=${apiKey}&query=${streamer}`
      )
      .then(res => {
        console.log(res.data.channels);
      });
  }

  render() {
    return (
      <div>
        <Form fetchData={this.fetchData} />
        <FeaturedStreams featured={this.state.featured} />
        <TopGames games={this.state.games} />
        <LiveChannels channels={this.state.channels} />
      </div>
    );
  }
}

module.exports = App;
