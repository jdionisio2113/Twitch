import React from "react";
import img from "../img/twitch-logo.png";
import img2 from "../img/twitch-logo2.png";
import { Link, withRouter } from "react-router-dom";
import liveCircle from "../img/red-circle.png";
import api from "../config/api";
import truncateString from "../utils/truncateString";
import errorMessage from "../utils/errorMessage";

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			liveChannels: [],
			isNavOpen: false,
			userName: [],
			loader: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.displaySuggestedLiveResults = this.displaySuggestedLiveResults.bind(
			this
		);
		this.handleReset = this.handleReset.bind(this);
		this.toggleNav = this.toggleNav.bind(this);
		this.navMarkUp = this.navMarkUp.bind(this);
		this.mobileNavMarkUp = this.mobileNavMarkUp.bind(this);
	}

	componentDidMount() {

		this.underlineNavLink();
		this.props.history.listen(() => this.underlineNavLink());
	}

	underlineNavLink() {

		// const navLinkBorders = [...document.getElementsByClassName('nav-link-border')];

		// // reset display of border
		// navLinkBorders.forEach(function (el) {
		// 	el.style.display = 'none';
		// });

		// // check the route we're currently visiting
		// var currentPath = location.pathname;

		// // select an element by it href attribute
		// var currentLink = document.querySelectorAll(`a[href='${currentPath}'].nav-link`)[0];


		// var nextSiblingElement = currentLink.nextSibling;


		// if (nextSiblingElement && nextSiblingElement.classList.contains('nav-link-border')) {
		// 	nextSiblingElement.style.display = 'block';
		// }


	}

	mobileNavMarkUp() {

		return <div className="menu">
			<div className="nav-options">
				<ul>
					<li className="home-link">
						<Link
							className="nav-link"
							to={{
								pathname: "/"
							}}>
							Home
							<div className="nav-link-border"></div>
						</Link>
					</li>
					<li className="categories-link">
						<Link className="nav-link" to={"/categories"}>
							Categories
							<div className="nav-link-border"></div>
						</Link>
						{/* <Link className="nav-link"
							to={{
								pathname: "/categories",
								state: {
									channels: this.props.channels,
									games: this.props.games
								}
							}}
						> */}
						{/* Categories
							<div className="nav-link-border"></div>
						</Link> */}
					</li>

					<li className="popular-channels-link">
						<Link
							className="nav-link"
							to={{
								pathname: "/popular-channels",
								state: {
									channels: this.props.channels
								}
							}}>
							Channels
							<div className="nav-link-border"></div>
						</Link>
					</li>


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
				/>
				<i className="far fa-times-circle fa-2x" onClick={() => this.handleReset()} />
			</div>

		</div >

	}

	navMarkUp() {
		return <>
			<div className="menu-container">
				<ul className="nav-list">
					<li className="home-link">
						<Link
							className="nav-link"
							to={{
								pathname: "/"
							}}>
							Home
						</Link>
						<div className="nav-link-border"></div>
					</li>
					<li className="categories-link">
						<Link
							className="nav-link"
							to={{
								pathname: "/categories",
								state: {
									games: this.props.games,
									channels: this.props.channels
								}
							}}>
							Categories
						</Link>
						<div className="nav-link-border"></div>
					</li>
					<li className="popular-channels-link">
						<Link
							className="nav-link"
							to={{
								pathname: "/popular-channels",
								state: {
									channels: this.props.channels
								}
							}}>
							Channels
						</Link>
						<div className="nav-link-border"></div>
					</li>
				</ul>
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

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen, input: "",
			userName: []
		});
	}

	handleChange(e) {
		var value = e.target.value;

		this.setState({ input: value });

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

						return streamer.user_name
					}
				});

				var streamer_collection = [];
				streamer_collection.push(filtered_streamers)

				this.setState({
					userName: streamer_collection
				})
			})
				.catch(() => {
					console.log("error")
				});

		}, 600);
	}

	handleReset() {
		this.setState({
			input: "",
			userName: []
		});
	}

	displaySuggestedLiveResults() {
		if (this.state.input) {
			return this.state.userName.map(item => {
				return item.map(item => {
					console.log(item)
					var viewers = item.viewer_count;
					var streamViewers = viewers.toLocaleString();
					var username = item.user_name.toLowerCase()
					let newURL = item.thumbnail_url
						.replace("{width}", "150")
						.replace("{height}", "85");
					item.thumbnail_url = newURL;
					return (
						<ul key={item.id} className="suggested-live-results">
							<li>
								<Link
									to={`/channelPage/${item.user_name}`}
									className="suggested-item-container"
								>
									<img
										className="suggested-stream-logo"
										src={item.thumbnail_url}
									/>
									<div className="suggested-result">
										<p>{item.user_name}</p>
										<p className="stream-status">{truncateString(item.title, 40)}</p>
										<div className="stream-menu-description">
											<img className="live_circle" src={liveCircle} />
											<p className="stream-status">{streamViewers}</p>
										</div>
									</div>
								</Link>
							</li>
						</ul>
					)
				})
			})
		}
	}

	render() {
		return (
			<div className="nav" >
				<a className="home_link" href="/">
					<img className="twitch-logo" src={img} />
					<img className="twitch-logo2" src={img2} />
				</a>
				{this.navMarkUp()}
				<button className="menu-button" onClick={() => this.toggleNav()}>
					<i className="fas fa-bars fa-2x" />
				</button>

				{
					this.state.isNavOpen ? (

						this.mobileNavMarkUp()

					) : null
				}
			</div >

		);
	}
}

export default withRouter(Navigation);
