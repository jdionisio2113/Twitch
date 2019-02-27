var React = require("react");
var Bootstrap = require("react-bootstrap");
var Carousel = require("react-bootstrap/Carousel");

function Streams(props) {
  var { featured, currentFeaturedStream, onSelect } = props;
  // var mainStream = featured.slice(1);
  console.log(featured);

  // var x = featured.map(function(item) {
  //   <img src={item.image} />;
  // });

  // console.log(x);
  return (
    <div className="featured-streams">
      {/* <p>{featured.stream.channel.game}</p> */}
      {/* <div>
        <img src={currentFeaturedStream.image} />

        <p>{currentFeaturedStream.text}</p>
      </div> */}
      {/* <div className="scrollMenu">
        {featured.map(function(item, index) { */}
      {/* // console.log(item.stream.channel.game); */}

      <div className="game_container">
        {/* <p>{item.stream.channel.game}</p> */}
        {/* <a onClick={onSelect.bind(this, item)}>
                <img className="logo" src={item.stream.preview.small} />
                
              </a> */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={featured.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={featured.image}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={featured.image}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* // })} */}
      {/* // </div> */}
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
