import React from "react";
import Bootstrap from "react-bootstrap";
import Carousel, { Item } from "react-bootstrap/Carousel";
import Slider from "react-slick";
import PropTypes from "prop-types";

function Streams(props) {
	var { featured } = props;
	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	// console.log(featured)

	return (
		<div className="featured-streams">
			<div className="game-container">
				{/* <Carousel> */}
				<Slider {...settings}>
					{featured.map(function (item, index) {
						// var caption = item.stream.channel.status;
						// var length = 40;
						// var trimmedCaption =
						// 	caption.length > length
						// 		? caption.substring(0, length - 3) + "..."
						// 		: caption;

						// var viewers = item.stream.viewers;
						// var channelname = item.stream.channel.display_name;
						var channelname = item.user_name

						// var streamViewers = viewers.toLocaleString();

						var streamer = `https://player.twitch.tv/?channel=${channelname}`;
						return (
							<div key={index} className="featured-stream-container">
								{/* <iframe
									src={streamer}
									frameBorder="0"
									allowFullScreen={true}
									scrolling="no"
									height="378"
									width="100%"
									autoPlay={false}
								/> */}
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
