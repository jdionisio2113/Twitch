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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="live-channels-container">
      <h6 className="live-channels">Popular Live Channels</h6>
      <Slider {...settings}>
        {channels.map(function(item) {
          var viewers = item.viewers;
          var streamViewers = viewers.toLocaleString();
          return (
            <div className="live-channel-image" key={item._id}>
              <div>
                <img
                  className="live-channel-banner"
                  src={item.preview.medium}
                />
                <p className="channel-live">Live</p>
                {/* <img className="" src={} /> */}
                <p className="channelViewers">{streamViewers} viewers</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default LiveChannels;
