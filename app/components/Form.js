import React from "react";
import axios from "axios";
import img from "../img/twitch-logo.png";
import img2 from "../img/twitch-logo2.png";
import { Link } from "react-router-dom";
import App from "./App";
import ChannelPage from "./ChannelPage";
import liveCircle from "../img/red-circle.png";
import api from '../config/api';
import truncateString from '../utils/truncateString'

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			suggestedChannels: [],
			liveChannels: [],
			open: false,
			userName: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.displaySuggestedLiveResults = this.displaySuggestedLiveResults.bind(
			this
		);
		this.handleReset = this.handleReset.bind(this);
		this.openMenu = this.openMenu.bind(this);
	}

	openMenu() {
		this.setState({ open: !this.state.open });
	}

	handleChange(e) {
		var value = e.target.value;

		this.setState({ input: value, suggestedChannels: [], liveChannels: [] });

		// prevent ajax request from firing if value is empty

		clearTimeout(this.myTimeout);

		this.myTimeout = setTimeout(() => {

			api.get("https://api.twitch.tv/helix/streams?first=100").then(res => {
				this.setState({
					liveChannels: res.data.data
				});

				var filtered_streamers = this.state.liveChannels.filter(streamer => {
					var streamer_name = streamer.user_name.toLowerCase();
					var user_input = value.toLowerCase();

					if (streamer_name.indexOf(user_input) !== -1) {
						// console.log(streamer.user_name)
						return streamer.user_name
					}
				});

				var streamer_collection = [];
				streamer_collection.push(filtered_streamers)

				this.setState({
					userName: streamer_collection
				})
			});

		}, 600);
	}

	handleReset() {
		this.setState({
			input: "",
			suggestedChannels: [],
			liveChannels: [],
			userName: []
		});
	}

	displaySuggestedLiveResults() {
		if (this.state.input) {
			return this.state.userName.map(item => {
				return item.map(item => {
					var viewers = item.viewer_count;
					var streamViewers = viewers.toLocaleString();
					var username = item.user_name.toLowerCase()
					let newURL = item.thumbnail_url
						.replace("{width}", "150")
						.replace("{height}", "85");
					item.thumbnail_url = newURL;
					return (
						<ul className="suggested-live-results">
							<Link
								onClick={this.handleReset}
								to={{
									pathname: "/channelpage",
									search: "?streamer=" + item.user_name,
									state: {
										suggestedResult: item
									}
								}}
								key={item.id}
							>
								<div className="suggested-item-container">
									<img
										className="suggested-stream-logo"
										src={item.thumbnail_url}
									/>
									<li className="suggested-result">
										<p>{item.user_name}</p>
										<p className="stream-status">{truncateString(item.title, 40)}</p>
										{/* <p className="stream-game">{item.game}</p> */}
										<div className="stream-menu-description">
											<img className="live_circle" src={liveCircle} />
											<p className="stream-status">{streamViewers}</p>
										</div>
									</li>
								</div>
							</Link>
						</ul>
					)
				})
			})
		}
	}

	render() {
		return (
			<div>
				<div className="nav">
					<a className="home_link" href="/">
						<img className="twitch-logo" src={img} />
						<img className="twitch-logo2" src={img2} />
					</a>
					<div className="menu-container">
						<button className="menu-button" onClick={() => this.openMenu()}>
							<i className="fas fa-bars fa-2x" />
						</button>
					</div>
					<div className="search-box input-container">
						<input
							type="text"
							name="streamer"
							placeholder="Search"
							autoComplete="off"
							className="input"
							value={this.state.input}
							onChange={this.handleChange}
						/>
						<button onClick={this.handleReset} className="reset-button">
							<i className="far fa-times-circle fa-2x" />
						</button>
					</div>
				</div>
				<div className="channel_menu">
					{this.displaySuggestedLiveResults()}
				</div>

				{this.state.open ? (
					<div className="menu">
						{/* <ul>
							<li className="menu-link">
								<a href="/">Home</a>
							</li>
							<li className="menu-link">
								<a href="/categories">Categories</a>
							</li>

							<li> */}
						<div className="input-container">
							<input
								type="text"
								name="streamer"
								placeholder="Search"
								autoComplete="off"
								className="input"
								value={this.state.input}
								onChange={this.handleChange}
							// reset={this.state.reset}
							/>
							<i className="far fa-times-circle fa-2x" />
						</div>
						{/* </li>
						</ul> */}
					</div>
				) : null}
			</div>
		);
	}
}

export default Form;
