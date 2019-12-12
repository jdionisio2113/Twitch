import React from "react";
import PropTypes from "prop-types";

class FeaturedStreams extends React.Component {
	constructor(props) {
		super(props);

		this.changedStream = this.changedStream.bind(this);

	}

	changedStream(direction) {
		var { updateCurrentStream } = this.props;
		updateCurrentStream(direction);
	}

	render() {

		var { currentStream } = this.props;

		if (currentStream.id && currentStream.user_name) {
			let streamUrl = `https://player.twitch.tv/?channel=${currentStream.user_name}`;
			return (
				<div className="featured-streams">
					<div className="game-container">
						<iframe
							src={streamUrl}
							frameBorder="0"
							allowFullScreen={true}
							scrolling="no"
							height="400"
							width="100%"
						/>
						<button onClick={this.changedStream.bind(this, 'prev')}>Previous</button>
						<button onClick={this.changedStream.bind(this, 'next')}>Next</button>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

FeaturedStreams.propTypes = {
	featured: PropTypes.array.isRequired
};

export default FeaturedStreams;