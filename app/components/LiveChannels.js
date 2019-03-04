import React from "react";
import Slider from "react-slick";

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

function LiveChannels() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div>
      <h2>Center Mode</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default LiveChannels;
