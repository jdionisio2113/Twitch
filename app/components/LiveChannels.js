import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import StreamCard from './StreamCard';

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
			<div className="live-channels-container">
				<h6 className="live-channels">Popular Live Channels</h6>
				<Slider {...settings}>
					{channels.map(function (item) {

						var viewers = item.viewer_count;
						var streamViewers = viewers.toLocaleString();
						let newURL = item.thumbnail_url
							.replace("{width}", "650")
							.replace("{height}", "400");
						item.thumbnail_url = newURL;
						return (
							<div className="live-channel-image" key={item.id}>
								<Link
									to={{
										pathname: "/channelpage",
										search: "?streamer=" + item.user_name,
										state: {
											suggestedResult: item
										}
									}}
								>
									<StreamCard item={item} />
								</Link>
							</div>
						);

					})}
				</Slider>
			</div>
		</div>
	);
}

LiveChannels.propTypes = {
	channels: PropTypes.array.isRequired
};

export default LiveChannels;
