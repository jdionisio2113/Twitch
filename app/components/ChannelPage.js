import React from "react";
import Form from "./Form";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetID: "twitch-embed"
    };
    this.updateTwitchStream = this.updateTwitchStream.bind(this);
  }

  updateTwitchStream() {
    var { match, location } = this.props;
    var { suggestedChannels } = location.state;

    // remove previous twitch-stream script

    let embed;
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL);
    script.addEventListener("load", () => {
      embed = new window.Twitch.Embed(this.state.targetID, {
        width: "940",
        height: "480",
        theme: "dark",
        channel: `${suggestedChannels}`
      });
    });

    // script.id = "twitch-stream";

    var stream_container = document.getElementById("stream-container");
    stream_container.appendChild(script);
  }

  componentDidUpdate() {
    document.getElementById("twitch-embed").innerHTML = "";
    this.updateTwitchStream();
  }

  componentDidMount() {
    this.updateTwitchStream();
  }

  render() {
    var suggestedChannels = this.props.location.state.suggestedChannels;

    return (
      <div className="channel-box">
        <h1 className="channel-display_name">{suggestedChannels}</h1>

        <div id="stream-container">
          <div id={this.state.targetID} />
        </div>
      </div>
    );
  }
}

export default ChannelPage;
