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
import { all, get } from "axios";

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			suggestedChannels: [],
			channels: [],
			liveChannels: [],
			games: [],
			open: false,
			userName: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.displaySuggestedLiveResults = this.displaySuggestedLiveResults.bind(
			this
		);
		this.handleReset = this.handleReset.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.fetchGamesAndChannels = this.fetchGamesAndChannels.bind(this);
		this.navMarkUp = this.navMarkUp.bind(this);
		this.mobileNavMarkUp = this.mobileNavMarkUp.bind(this);
	}

	componentDidMount() {
		this.fetchGamesAndChannels("https://api.twitch.tv/helix/games/top", "https://api.twitch.tv/helix/streams?first=100")
	}

	mobileNavMarkUp() {
		return <div className="menu">
			<div className="nav-options">
				<ul>
					<Link
						to={{
							pathname: "/"
						}}>
						<li className="home-link">Home</li>
						<div className="home-border"></div>
					</Link>
					<Link
						to={{
							pathname: "/categories",
							state: {
								games: this.state.games,
								channels: this.state.channels
							}
						}}>
						<li className="categories-link">Categories</li>
						<div className="categories-border"></div>
					</Link>
					<Link
						to={{
							pathname: "/popular-channels",
							state: {
								channels: this.state.channels
							}
						}}>
						<li className="popular-channels-link">Channels</li>
						<div className="popular-channels-border"></div>
					</Link>
				</ul>
			</div>

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

		</div>

	}

	navMarkUp() {
		return <>
			<div className="menu-container">
				<ul className="nav-list">
					<Link
						to={{
							pathname: "/"
						}}>
						<li className="home-link">Home</li>
						<div className="home-border"></div>
					</Link>
					<Link
						to={{
							pathname: "/categories",
							state: {
								games: this.state.games,
								channels: this.state.channels
							}
						}}>
						<li className="categories-link">Categories</li>
						<div className="categories-border"></div>
					</Link>
					<Link
						to={{
							pathname: "/popular-channels",
							state: {
								channels: this.state.channels
							}
						}}>
						<li className="popular-channels-link">Channels</li>
						<div className="popular-channels-border"></div>
					</Link>
				</ul>
				{/* <button className="menu-button" onClick={() => this.openMenu()}>
					<i className="fas fa-bars fa-2x" />
				</button> */}
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
			<div className="channel_menu">
				{this.displaySuggestedLiveResults()}
			</div>
		</>
	}

	fetchGamesAndChannels(games, channels) {
		all([api.get(games), api.get(channels)]).then(
			res => {
				var games = res[0].data.data;
				var channels = res[1].data.data;

				this.setState({
					games,
					channels,
					loader: false
				});
			}
		)
	}

	openMenu() {
		this.setState({
			open: !this.state.open, input: "",
			suggestedChannels: [],
			channels: [],
			userName: []
		});
	}

	handleChange(e) {
		var value = e.target.value;

		this.setState({ input: value, suggestedChannels: [], channels: [] });

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
			channels: [],
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
		var currentLocation = location.pathname;

		if (document.querySelector(".home-link")) {

			{ currentLocation === "/" ? document.querySelector(".home-border").style.display = "block" : document.querySelector(".home-border").style.display = "none" }
		}

		if (document.querySelector(".categories-link")) {

			{ currentLocation === "/categories" ? document.querySelector(".categories-border").style.display = "block" : document.querySelector(".categories-border").style.display = "none" }
		}

		if (document.querySelector(".popular-channels-link")) {

			{ currentLocation === "/popular-channels" ? document.querySelector(".popular-channels-border").style.display = "block" : document.querySelector(".popular-channels-border").style.display = "none" }
		}

		return (
			<div>
				<div className="nav">
					<a className="home_link" href="/">
						<img className="twitch-logo" src={img} />
						<img className="twitch-logo2" src={img2} />
					</a>
					{this.navMarkUp()}
					{/* <div className="menu-container">
						<ul className="nav-list">
							<Link
								to={{
									pathname: "/"
								}}>
								<li className="home-link">Home</li>
								<div className="home-border"></div>
							</Link>
							<Link
								to={{
									pathname: "/categories",
									state: {
										games: this.state.games,
										channels: this.state.channels
									}
								}}>
								<li className="categories-link">Categories</li>
								<div className="categories-border"></div>
							</Link>
							<Link
								to={{
									pathname: "/popular-channels",
									state: {
										channels: this.state.channels
									}
								}}>
								<li className="popular-channels-link">Channels</li>
								<div className="popular-channels-border"></div>
							</Link>
						</ul>
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
				</div> */}
					<button className="menu-button" onClick={() => this.openMenu()}>
						<i className="fas fa-bars fa-2x" />
					</button>

					{this.state.open ? (


						this.mobileNavMarkUp()


					) : null}
				</div>
			</div>
		);
	}
}

export default Form;
