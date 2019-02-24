var React = require("react");
var axios = require("axios");
var Form = require("./Form");

var apiKey = "t8yaydrbaft3dpp950285vmtcal743";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      featuredStreams: [],
      games: []
    };

    this.twitchData = this.twitchData.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  twitchData(featured, game) {
    axios.all([axios.get(featured), axios.get(game)]).then(res => {
      var featuredStream = res[0].data;
      var game = res[1].data;

      // console.log(streamers);
      console.log(featuredStream);
      console.log(game);
    });
  }

  componentDidMount() {
    // const streamer = e.target.elements.streamer.value;
    this.twitchData(
      `https://api.twitch.tv/kraken/streams/featured?client_id=${apiKey}`,
      `https://api.twitch.tv/kraken/games/top?client_id=${apiKey}`
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
        console.log(res);
      });
  }

  render() {
    return <Form fetchData={this.fetchData} />;
  }
}

module.exports = App;
