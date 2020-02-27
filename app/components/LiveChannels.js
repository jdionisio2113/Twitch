import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StreamCard from "./StreamCard";

function LiveChannels(props) {
	var { channels } = props;

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	return (
		<div className="top-live-channels">
			<div className="live-channels-category">
				<h6 className="live-channels">Popular Live Channels</h6>
				<Link className="see-All_link"
					to={"/directory_popular-channels"}>
					See All
					</Link>
			</div>
			<Slider {...settings}>
				{channels.map(function (suggestedStreamer) {
					return (
						<div className="live-channel-image" key={suggestedStreamer.id}>
							<Link
								to={{
									pathname: `/directory/${suggestedStreamer.user_name}`
								}}
							>
								<div className="popular_channel">
									<StreamCard suggestedStreamer={suggestedStreamer} />
								</div>
							</Link>
						</div>
					);

				})}
			</Slider>
		</div>
	);
}

LiveChannels.propTypes = {
	channels: PropTypes.array.isRequired
};

export default LiveChannels;
