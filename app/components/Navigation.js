import React from "react";
import img from "../img/twitch-logo.png";
import img2 from "../img/twitch-logo2.png";
import { Link, withRouter } from "react-router-dom";
import liveCircle from "../img/red-circle.png";
import api from "../config/api";
import truncateString from "../utils/truncateString";

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			liveChannels: [],
			isNavOpen: false,
			isInputOpen: false,
			userName: [],
			error: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.displaySuggestedLiveResults = this.displaySuggestedLiveResults.bind(
			this
		);
		this.handleReset = this.handleReset.bind(this);
		this.toggleNav = this.toggleNav.bind(this);
		this.navMarkUp = this.navMarkUp.bind(this);
		this.mobileNavMarkUp = this.mobileNavMarkUp.bind(this);
		this.toggleSearchInput = this.toggleSearchInput.bind(this);
		this.searchMarkUp = this.searchMarkUp.bind(this);
	}

	// componentDidMount() {

	// 	this.underlineNavLink();
	// 	this.props.history.listen(() => this.underlineNavLink());
	// }

	// underlineNavLink() {

	// 	const navLinkBorders = [...document.getElementsByClassName('nav-link-border')];

	// 	// reset display of border
	// 	navLinkBorders.forEach(function (el) {
	// 		el.style.display = 'none';
	// 	});

	// 	// check the route we're currently visiting
	// 	var currentPath = location.pathname;
	// 	console.log(currentPath)

	// 	// select an element by it href attribute
	// 	var currentLink = document.querySelectorAll(`a[href='${currentPath}'].nav-link`)[0];
	// 	// console.log(currentLink)

	// 	var nextSiblingElement = currentLink.nextSibling;

	// 	console.log(nextSiblingElement)

	// 	if (nextSiblingElement && nextSiblingElement.classList.contains('nav-link-border')) {
	// 		nextSiblingElement.style.display = 'block';
	// 	}


	// }

	mobileNavMarkUp() {

		return <div className="menu">
			<div className="nav-options">
				<ul className="mobile-nav-list" onClick={() => this.toggleNav()}>
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
						<Link className="nav-link" to={"/directory"}>
							Browse
							<div className="nav-link-border"></div>
						</Link>
					</li>
					<li className="popular-channels-link">
						<Link
							className="nav-link"
							to={"/directory_popular-channels"}>
							Channels
							<div className="nav-link-border"></div>
						</Link>
					</li>
				</ul>
			</div>
		</div >

	}

	searchMarkUp() {
		return (

			<div className="mobile-input-wrapper menu">
				<div className="mobile-input-container">
					<i className="fa fa-angle-left fa-2x" onClick={() => this.toggleSearchInput()}></i>
					<div className="mobile-search-container">
						<input
							type="text"
							name="streamer"
							placeholder="Search"
							autoComplete="off"
							className="mobile-input"
							value={this.state.input}
							onChange={this.handleChange}
						/>
						<i
							className={`
								${this.state.input === '' ? 'hide' : 'show'}
								far fa-times-circle fa-2x cancel-search-btn
								`}
							onClick={() => this.handleReset()}
						/>
					</div>

				</div>
			</div>
		)
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
							to={"/directory"}>
							Browse
						</Link>
						<div className="nav-link-border"></div>
					</li>
					<li className="popular-channels-link">
						<Link
							className="nav-link"
							to={"/directory_popular-channels"}>
							Channels
						</Link>
						<div className="nav-link-border"></div>
					</li>
					<li>
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
							<i
								className={`
								${this.state.input === '' ? 'hide' : 'show'}
								far fa-times-circle fa-2x cancel-search-btn
								`}
								onClick={() => this.handleReset()}
							/>
						</div>
					</li>
				</ul>
			</div>
			<div className="channel_menu">
				{this.state.error ? <h1 className="error-message">No streamer found! Try again.</h1> : this.displaySuggestedLiveResults()}
			</div>
		</>
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
			isInputOpen: false,
			input: "",
			userName: [],
			error: false
		});
	}

	toggleSearchInput() {
		this.setState({
			isInputOpen: !this.state.isInputOpen,
			isNavOpen: false,
			input: "",
			userName: [],
			error: false
		})
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

				if (filtered_streamers.length === 0) {
					this.setState({
						error: true
					})
				} else {
					this.setState({
						error: false
					})
				}
			})

		}, 600);
	}

	handleReset() {
		this.setState({
			input: "",
			userName: [],
			error: false
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
						<ul onClick={() => this.toggleSearchInput()} key={item.id} className="suggested-live-results">
							<li>
								<Link
									to={`/directory/${item.user_name}`}
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
				<button className="search-button" onClick={() => this.toggleSearchInput()}>
					<i className="fa fa-search fa-2x"></i>
				</button>
				<button className="menu-button" onClick={() => this.toggleNav()}>
					<i className="fas fa-bars fa-2x" />
				</button>
				{
					this.state.isInputOpen ? (

						this.searchMarkUp()

					) : null
				}
				{
					this.state.isNavOpen ? (

						this.mobileNavMarkUp()

					) : null
				}
			</div >
		);
	}
}

export default Navigation/*withRouter(Navigation)*/;
