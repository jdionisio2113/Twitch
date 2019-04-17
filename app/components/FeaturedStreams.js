import React from "react";
import Bootstrap from "react-bootstrap";
import Carousel, { Item } from "react-bootstrap/Carousel";
import Slider from "react-slick";
import PropTypes from "prop-types";
import img from "../img/play.png";

function Streams(props) {
  var { featured } = props;
  // var mainStream = featured.slice(1);
  console.log(featured);

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
          {featured.map(function(item) {
            var caption = item.stream.channel.status;
            var length = 40;
            var trimmedCaption =
              caption.length > length
                ? caption.substring(0, length - 3) + "..."
                : caption;

            var viewers = item.stream.viewers;

            var streamViewers = viewers.toLocaleString();

            return (
              // <Item key={item.stream._id}>
              <div className="featured-stream-container">
                <div className="featured-stream-image">
                  <img
                    className="featured-stream-image"
                    src={item.stream.preview.large}
                  />
                  <img className="play" src={img} />
                  <p className="live">Live</p>
                  <div className="viewersContainer">
                    <p className="viewers">{streamViewers} viewers</p>
                  </div>
                </div>

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
              // </Item>
            );
          })}
          {/* </Carousel> */}
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
      <Streams
        featured={this.props.featured}
        onSelect={this.updateCurrentFeaturedStream}
        currentFeaturedStream={this.state.currentFeaturedStream}
      />
    );
  }
}

export default FeaturedStreams;
