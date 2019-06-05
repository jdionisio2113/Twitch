import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import FeaturedStreams from "./FeaturedStreams";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

// class Stream extends React.Component {
function Stream(props) {
  //   componentDidMount() {
  var { featured, channel, targetID, width, height } = props;
  let embed;
  const script = document.createElement("script");
  script.setAttribute("src", EMBED_URL);
  script.addEventListener("load", () => {
    embed = new window.Twitch.Embed(targetID, { ...props });
  });
  document.body.appendChild(script);
  {
    featured.map(function(item, index) {
      var channelname = item.stream.channel.display_name;
      console.log(channelname);
    });
  }
  //   }

  //   render() {
  return (
    <div>
      {/* <h1>{this.props.display_name}</h1> */}
      {/* Hello {channel} {targetID} */}
      <div id={targetID} />
      {/* <FeaturedStreams targetID={this.props.targetID} /> */}
    </div>
  );
}
//   }
// }

Stream.defaultProps = {
  targetID: "twitch-embed",
  width: "940",
  height: "480",
  channel: "gorillaphent"
};

export default Stream;
