import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

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

						var caption = item.title;
						var length = 33;
						var trimmedChannelCaption =
							caption.length > length
								? caption.substring(0, length - 3) + "..."
								: caption;

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
												<p className="channel-caption">{trimmedChannelCaption}</p>
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





