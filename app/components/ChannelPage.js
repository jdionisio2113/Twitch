import React from "react";
import Form from "./Form";

// const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

// class ChannelPage extends React.Component {
//   componentDidMount() {
//     this.channelpage = this.props.match.params;
//     this.suggestedChannels = this.props.location.state;

//     let embed;
//     const script = document.createElement("script");
//     script.setAttribute("src", EMBED_URL);
//     script.addEventListener("load", () => {
//       embed = new window.Twitch.Embed(this.props.targetID, {
//         targetID: "twitch-embed",
//         width: "940",
//         height: "480",
//         // channel: `${suggestedChannels}`
//         channel: "loserfruit"
//       });
//     });
//     document.body.appendChild(script);
//     this.streamer = JSON.stringify(this.suggestedChannels);
//     console.log(this.streamer);
//   }

//   render() {
//     this.channelpage = this.props.match.params;
//     this.suggestedChannels = this.props.location.state;
//     return (
//       <div className="channel-box">
//         <h1 className="channel-name">{this.streamer}</h1>
//         <div id={this.props.targetID} />
//       </div>
//     );
//   }
// }

// ChannelPage.defaultProps = {
//   targetID: "twitch-embed",
//   width: "970",
//   height: "510",
//   // channel: `${suggestedChannels}`
//   channel: "loserfruit"
// };

function ChannelPage(props) {
  var { suggestedChannels, channelpage, match, location, targetID } = props;
  var { channelpage } = match.params;
  var { suggestedChannels } = location.state;

  var channel = `https://player.twitch.tv/?channel=${suggestedChannels}`;

  // var streamer = Object.values(suggestedChannels);
  // ChannelPage.defaultProps = {
  //   targetID: "twitch-embed",
  //   width: "940",
  //   height: "480",
  //   channel: `${streamer}`
  // };

  // let embed;
  // const script = document.createElement("script");
  // script.setAttribute("src", EMBED_URL);
  // script.addEventListener("load", () => {
  //   embed = new window.Twitch.Embed(targetID, { ...props });
  // });
  // document.body.appendChild(script);

  return (
    <div className="channel-box">
      {/* <div id={targetID} /> */}
      <iframe
        src={channel}
        frameBorder="0"
        allowFullScreen={true}
        scrolling="no"
        height="378"
        width="620"
        autoPlay={true}
      />
    </div>
  );
}

// ChannelPage.defaultProps = {
//   targetID: "twitch-embed",
//   width: "940",
//   height: "480",
//   channel: `${suggestedChannels}`
// };

export default ChannelPage;
