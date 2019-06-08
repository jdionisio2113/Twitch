import React from "react";
import Form from "./Form";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

function ChannelPage(props) {
  var { suggestedChannels, channelpage, match, location, targetID } = props;
  var { channelpage } = match.params;
  var { suggestedChannels } = location.state;
  console.log(suggestedChannels);

  var targetID = "twitch-embed";
  let embed;
  const script = document.createElement("script");
  script.setAttribute("src", EMBED_URL);
  script.addEventListener("load", () => {
    embed = new window.Twitch.Embed(targetID, {
      width: "940",
      height: "480",
      channel: `${suggestedChannels}`
    });
  });
  document.body.appendChild(script);

  return (
    <div className="channel-box">
      <div id={targetID} />
    </div>
  );
}

export default ChannelPage;
