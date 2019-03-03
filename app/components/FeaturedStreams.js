var React = require("react");
var Bootstrap = require("react-bootstrap");
var Carousel = require("react-bootstrap/Carousel");
// var Slider = require("react-slick");

function Streams(props) {
  var { featured, currentFeaturedStream, onSelect } = props;
  // var mainStream = featured.slice(1);
  console.log(featured);

  return (
    <div className="featured-streams">
      <div className="game_container">
        <Carousel>
          {featured.map(function(item) {
            var caption = item.stream.channel.status;
            var length = 40;
            var trimmedCaption =
              caption.length > length
                ? caption.substring(0, length - 3) + "..."
                : caption;

            return (
              <Carousel.Item>
                <div className="featured-stream-container">
                  <div className="featured-stream-image">
                    <img
                      // className="featured-stream-image"
                      src={item.stream.preview.medium}
                    />
                    <p className="live">Live</p>
                  </div>

                  <div className="featured-stream-description">
                    <img
                      width="60px"
                      height="60px"
                      className="featured-stream-logo"
                      src={item.stream.channel.logo}
                    />

                    <div className="featured-stream-caption">
                      <h3 className="featured-stream-name">
                        {item.stream.channel.display_name}
                      </h3>
                      <p className="featured-stream-channel-caption">
                        {trimmedCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

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

module.exports = FeaturedStreams;
