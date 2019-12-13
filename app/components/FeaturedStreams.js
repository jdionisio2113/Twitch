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
					<div className="featured-container">
						<button onClick={this.changedStream.bind(this, 'prev')}><i className="fas fa-chevron-left fa-2x"></i></button>
						<iframe
							src={streamUrl}
							frameBorder="0"
							allowFullScreen={true}
							scrolling="no"
							height="400"
							width="80%"
						/>
						<button onClick={this.changedStream.bind(this, 'next')}><i className="fas fa-chevron-right fa-2x"></i></button>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default FeaturedStreams;