import React from "react";
import Form from "./Form";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

class ChannelPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			targetID: "twitch-embed"
		};
		this.updateTwitchStream = this.updateTwitchStream.bind(this);
	}

	updateTwitchStream() {
		var { match, location } = this.props;
		var { suggestedResult } = location.state;

		var channelName = suggestedResult.user_name;
		var banner = suggestedResult.profile_banner;

		// remove previous twitch-stream script

		let embed;
		const script = document.createElement("script");
		script.setAttribute("src", EMBED_URL);
		script.addEventListener("load", () => {
			embed = new window.Twitch.Embed(this.state.targetID, {
				width: "100%",
				height: "480",
				// width: "940",
				// height: "480",
				theme: "dark",
				channel: `${channelName}`
			});
		});

		var stream_container = document.getElementById("stream-container");
		stream_container.appendChild(script);
	}

	componentDidUpdate() {
		document.getElementById("twitch-embed").innerHTML = "";
		this.updateTwitchStream();
	}

	componentDidMount() {
		this.updateTwitchStream();
	}

	render() {
		var suggestedResult = this.props.location.state.suggestedResult;
		// var banner = this.props.location.state.suggestedResult;
		return (
			<div>
				<div className="channelContainer">
					{/* <div
						className="channel-info"
						style={{
							backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${
								banner.profile_banner
								})`
						}}
					> */}
					{/* <img className="channel-logo2" src={suggestedResult.logo} /> */}
					<h1 className="channel-display_name">
						{suggestedResult.user_name}
					</h1>
					{/* </div> */}
					<div className="channel-box">
						{/* <p>{suggestedChannels.followers}</p> */}
						<div id="stream-container">
							<div className="stream" id={this.state.targetID} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChannelPage;
