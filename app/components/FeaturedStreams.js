var React = require("react");

function Streams(props) {
  var { featured, currentFeaturedStream, onSelect } = props;
  // var mainStream = featured.slice(1);
  // console.log(featured);

  return (
    <div className="featured-streams">
      {/* <p>{featured.stream.channel.game}</p> */}
      <div>
        <img src={currentFeaturedStream.image} />
        <p>{currentFeaturedStream.text}</p>
      </div>
      <div className="scrollMenu">
        {featured.map(function(item, index) {
          // console.log(item.stream.channel.game);

          return (
            <div key={index} className="game_container">
              {/* <p>{item.stream.channel.game}</p> */}
              <a onClick={onSelect.bind(this, item)}>
                <img className="logo" src={item.stream.preview.small} />
                {/* <h1>{item.game.name}</h1> */}
              </a>
            </div>
          );
        })}
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
