import React from "react";
import { all, get } from "axios";
import Form from "./Form";
// import Example from "./Example";
import FeaturedStreams from "./FeaturedStreams";
import TopGames from "./TopGames";
import LiveChannels from "./LiveChannels";
import Categories from "./Categories";
import ChannelPage from "./ChannelPage";
import Loader from "./Loader";
import apiKey from "../config/apiKey";
var ReactRouter = require("react-router-dom");
var Switch = ReactRouter.Switch;
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import api from "../config/api";
import StreamPage from './StreamPage'

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			featured: [],
			games: [],
			channels: [],
			loader: false
		};

		this.twitchData = this.twitchData.bind(this);

	}

	twitchData(featured, game, channels) {
		this.setState({
			loader: true
		});
		// all([api.get(featured), api.get(game), get(channels)]).then(res => {
		// 	var featured = res[0].data.featured;
		// 	var game = res[1].data.top;
		// 	var channels = res[2].data.streams;

		// 	this.setState({
		// 		featured: featured,
		// 		loader: false
		// 	});

		// 	this.setState({
		// 		games: game,
		// 		loader: false
		// 	});

		// 	this.setState({
		// 		channels: channels,
		// 		loader: false
		// 	});
		// });

		// api.get("https://api.twitch.tv/helix/games/top")
		// .then(res=>{
		// 	console.log(res.data.data)
		// 	var game = res.data.data
		// 		this.setState({
		// 		games: game,
		// 		loader: false
		// 	});
		// })

		// api.get("https://api.twitch.tv/helix/streams")
		// .then(res=>{
		// 	console.log(res.data.data)
		// 	var featured = res.data.data
		// 		this.setState({
		// 		featured: featured,
		// 		loader: false
		// 	});
		// })

		all([api.get(featured), api.get(game), api.get(channels)]).then(
			res => {
				var featured = res[0].data.data;
				var game = res[1].data.data;
				var channels = res[2].data.data;
				// console.log(featured)
				// console.log(game)
				// console.log(channels)

				// var game = res.data.data
				this.setState({
					games: game,
					loader: false
				});

				// var featured = res.data.data
				this.setState({
					featured: featured,
					loader: false
				});

				this.setState({
					channels: channels,
					loader: false
				});
			}
		)
	}

	// componentDidMount() {
	// 	this.twitchData(
	// 		`https://api.twitch.tv/kraken/streams/featured?client_id=${apiKey}&limit=5`,
	// 		`https://api.twitch.tv/kraken/games/top?client_id=${apiKey}`,
	// 		`https://api.twitch.tv/kraken/streams?client_id=${apiKey}&limit=7`
	// 	);
	// }
	componentDidMount() {
		this.twitchData("https://api.twitch.tv/helix/streams?first=1", "https://api.twitch.tv/helix/games/top", "https://api.twitch.tv/helix/streams?first=100")
	}

	render() {
		var loader = this.state.loader;

		if (loader === true) {
			return <Loader />;
		}
		return (
			<div className="main-container">
				<FeaturedStreams featured={this.state.featured} />
				<TopGames games={this.state.games} />
				<LiveChannels channels={this.state.channels} />
			</div>
		);
	}
}

const App = () => {
	return (
		<div>
			<Router>
				<div>
					<Form />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/channelpage" component={ChannelPage} />
						<Route exact path="/streampage" component={StreamPage} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
