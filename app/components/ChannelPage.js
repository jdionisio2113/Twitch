import React from "react";

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
		var { channels } = this.props;

		var currentPath = location.pathname;
		var directories = currentPath.split("/");
		var lastDirectory = directories[(directories.length - 1)];
		var decodedChannelName = decodeURIComponent(lastDirectory)
		var channelName;

		channels.map(channel => {

			if (channel.user_name === decodedChannelName) {
				channelName = channel.user_name
			}

		})

		let embed;
		const script = document.createElement("script");
		script.setAttribute("src", EMBED_URL);
		script.addEventListener("load", () => {
			embed = new window.Twitch.Embed(this.state.targetID, {
				width: "100%",
				height: "730",
				theme: "dark",
				channel: `${channelName}`,
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
		return (
			<div>
				<div className="channelContainer">

					<div className="channel-box">
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
