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

    var channelName = suggestedChannels.display_name;
    var banner = suggestedChannels.profile_banner;
    console.log(banner);

    // remove previous twitch-stream script

    let embed;
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL);
    script.addEventListener("load", () => {
      embed = new window.Twitch.Embed(this.state.targetID, {
        width: "100%",
        height: "480",
        // width: "940",
        // height: "480",
        theme: "dark",
        channel: `${channelName}`
      });
    });

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
    var banner = this.props.location.state.suggestedChannels;
    return (
      <div>
        <div className="channelContainer">
          <div
            className="channel-info"
            style={{
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${
                banner.profile_banner
              })`
            }}
          >
            <img className="channel-logo2" src={suggestedChannels.logo} />
            <h1 className="channel-display_name">
              {suggestedChannels.display_name}
            </h1>
          </div>
          <div className="channel-box">
            {/* <p>{suggestedChannels.followers}</p> */}
            <div id="stream-container">
              <div className="stream" id={this.state.targetID} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelPage;
