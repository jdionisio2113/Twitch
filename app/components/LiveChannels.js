var React = require("react");
var Slider = require("react-slick");

function LiveChannels(props) {
  var { channels } = props;

  return (
    <div className="live-channels-container">
      <h6 className="live-channels">Popular Live Channels</h6>
      {channels.map(function(item) {
        console.log(item);
        return (
          <div>
            <img className="live-channel-banner" src={item.preview.medium} />;
          </div>
        );
      })}
    </div>
  );
}

module.exports = LiveChannels;
