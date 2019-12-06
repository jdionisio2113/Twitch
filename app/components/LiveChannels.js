import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import truncateString from '../utils/truncateString'

function LiveChannels(props) {
	var { channels } = props;

	const settings = {
		dots: true,
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
									<div className="live-channel-box">
										<img
											className="live-channel-banner"
											src={item.thumbnail_url}
										/>
										<div className="viewer-container">
											<img
												className="red-img"
												src={require("../img/red-circle.png")}
											/>
											<p className="channelViewers">{streamViewers} viewers</p>
										</div>
										<div className="channel-link">
											<div className="channel-description">
												<h3 className="channel-name">
													{item.user_name}
												</h3>
												<p className="channel-caption">{truncateString(item.title, 33)}</p>
											</div>
										</div>
									</div>
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



/*

Make a function that shortens the length of a string and adds "..." at the end
@param String text
@param Number maxLength
@return String

1) If the string exceeds maxLength, add "..."

2) Otherwise return the original string

myFunc("My video is awesome because it is very awesome", 15);
	return "My video is awesom..."

myFunc("My video is awesome because it is very awesome", 100);
	return "My video is awesome because it is very awesome"
*/

