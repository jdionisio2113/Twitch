import React from "react";
import PropTypes from "prop-types";

class FeaturedStreams extends React.Component {
	constructor(props) {
		super(props);

		this.changedStream = this.changedStream.bind(this);
		this.prevButton = this.prevButton.bind(this);
		this.nextButton = this.nextButton.bind(this);
	}

	changedStream(direction) {
		var { updateCurrentStream } = this.props;
		updateCurrentStream(direction);
	}

	/**
	 * Changes the opacity of the 'previous button' for the featured streams slide
	 * only if the index of currentStream is less than or equal to zero.
	 */
	prevButton() {
		var { currentStream, featured } = this.props;

		if (featured.indexOf(currentStream) <= 0) {
			return <button onClick={this.changedStream.bind(this, 'prev')} style={{ opacity: 0.1 }}><i className="fas fa-chevron-left fa-2x"></i></button>
		} else {
			return <button onClick={this.changedStream.bind(this, 'prev')}><i className="fas fa-chevron-left fa-2x"></i></button>
		}
	}

	/**
	 * Changes the opacity of the 'next button' for the featured streams slide
	 * only if the index of currentStream is strictly equal to (featured.length - 1)
	 */
	nextButton() {
		var { currentStream, featured } = this.props;

		if (featured.indexOf(currentStream) === (featured.length - 1)) {
			return <button onClick={this.changedStream.bind(this, 'next')} style={{ opacity: 0.1 }}><i className="fas fa-chevron-right fa-2x"></i></button>
		} else {
			return <button onClick={this.changedStream.bind(this, 'next')}><i className="fas fa-chevron-right fa-2x"></i></button>
		}
	}

	render() {

		var { currentStream, featured } = this.props;

		if (currentStream.id && currentStream.user_name) {
			let streamUrl = `https://player.twitch.tv/?channel=${currentStream.user_name}`;
			return (
				<div className="featured-streams">
					<div className="featured-container">
						{this.prevButton()}
						<iframe
							src={streamUrl}
							frameBorder="0"
							allowFullScreen={true}
							scrolling="no"
							height="280"
							width="85%"
						/>
						{this.nextButton()}
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default FeaturedStreams;