import React from "react";
import Slider from "react-slick";
// import "./LiveChannels.scss";

// function LiveChannels(props) {
//   var { channels } = props;

//   return (
//     <div className="live-channels-container">
//       <h6 className="live-channels">Popular Live Channels</h6>
//       {channels.map(function(item) {
//         console.log(item);
//         return (
//           <div>
//             <img className="live-channel-banner" src={item.preview.medium} />;
//           </div>
//         );
//       })}
//     </div>
//   );
// }

function LiveChannels(props) {
  var { channels } = props;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };

  return (
    <div className="top-live-channels">
      <div className="live-channels-container">
        <h6 className="live-channels">Popular Live Channels</h6>
        <Slider {...settings}>
          {channels.map(function(item) {
            var caption = item.channel.status;
            var length = 33;
            var trimmedChannelCaption =
              caption.length > length
                ? caption.substring(0, length - 3) + "..."
                : caption;

            var viewers = item.viewers;
            var streamViewers = viewers.toLocaleString();
            return (
              <div className="live-channel-image" key={item._id}>
                <div className="live-channel-box">
                  <img
                    className="live-channel-banner"
                    src={item.preview.large}
                  />
                  {/* <p className="channel-live">Live</p> */}
                  {/* <img className="" src={} /> */}
                  <p className="channelViewers">{streamViewers} viewers</p>
                  <div className="channel-link">
                    <img className="channel-logo" src={item.channel.logo} />
                    <div className="channel-description">
                      <h3 className="channel-name">
                        {item.channel.display_name}
                      </h3>
                      <p className="channel-caption">{trimmedChannelCaption}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default LiveChannels;
