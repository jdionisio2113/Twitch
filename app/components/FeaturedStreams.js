import React from "react";
import Bootstrap from "react-bootstrap";
import Carousel, { Item } from "react-bootstrap/Carousel";
import Slider from "react-slick";
import PropTypes from "prop-types";
import img from "../img/play.png";
import Stream from "./Stream";
const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

function Streams(props) {
  var { featured, channel, targetID, width, height } = props;
  // var mainStream = featured.slice(1);
  // console.log(featured);
  // Streams.defaultProps = {
  //   targetID: "twitch-embed",
  //   width: "940",
  //   height: "480",
  //   channel: `${channelname}`
  // };

  // var channelname = featured.stream.channel.display_name;

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="featured-streams">
      <div className="game-container">
        {/* <Carousel> */}
        <Slider {...settings}>
          {featured.map(function(item, index) {
            var caption = item.stream.channel.status;
            var length = 40;
            var trimmedCaption =
              caption.length > length
                ? caption.substring(0, length - 3) + "..."
                : caption;

            // var viewers = item.stream.viewers;
            var channelname = item.stream.channel.display_name;
            // var streamViewers = viewers.toLocaleString();

            var streamer = `https://player.twitch.tv/?channel=${channelname}`;
            return (
              <div key={index} className="featured-stream-container">
                <iframe
                  src={streamer}
                  frameBorder="0"
                  allowFullScreen={true}
                  scrolling="no"
                  height="378"
                  width="620"
                />

                <div className="featured-stream-description">
                  <img
                    width="60px"
                    height="60px"
                    className="featured-stream-logo"
                    src={item.stream.channel.logo}
                  />

                  <div className="featured-stream-caption">
                    <a
                      className="stream-link"
                      href={item.stream.channel.url}
                      target="_blank"
                    >
                      <h3 className="featured-stream-name">
                        {item.stream.channel.display_name}
                      </h3>
                      <p className="featured-stream-channel-caption">
                        {trimmedCaption}
                      </p>
                    </a>
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

Streams.propTypes = {
  featured: PropTypes.array.isRequired
};

class FeaturedStreams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // featuredStreams: [],
      currentFeaturedStream: {}
    };

    this.updateCurrentFeaturedStream = this.updateCurrentFeaturedStream.bind(
      this
    );
  }

  updateCurrentFeaturedStream(stream) {
    console.log(stream);
    this.setState({
      currentFeaturedStream: stream
    });
  }

  render() {
    return (
      <div>
        {/* <Stream featured={this.props.featured} /> */}
        <Streams
          featured={this.props.featured}
          onSelect={this.updateCurrentFeaturedStream}
          currentFeaturedStream={this.state.currentFeaturedStream}
        />
      </div>
    );
  }
}

export default FeaturedStreams;
