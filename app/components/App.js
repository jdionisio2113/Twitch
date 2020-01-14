import React from "react";
import Navigation from "./Navigation";
import Categories from "./Categories";
import ChannelPage from "./ChannelPage";
var ReactRouter = require("react-router-dom");
var Switch = ReactRouter.Switch;
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import GamePage from "./GamePage";
import PopularChannelsPage from "./PopularChannelsPage";
import Home from "./Home";
import { all, get } from "axios";
import Loader from "./Loader";
import api from '../config/api';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loader: false,
			channels: [],
			games: []
		}

		this.fetchGamesAndChannels = this.fetchGamesAndChannels.bind(this);
	}


	componentDidMount() {

		this.fetchGamesAndChannels("https://api.twitch.tv/helix/games/top", "https://api.twitch.tv/helix/streams?first=100")
	}

	fetchGamesAndChannels(games, channels) {
		this.setState({
			loader: true
		});
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



	render() {
		var loader = this.state.loader;

		if (loader === true) {
			return <Loader />;
		}

		return (
			<div>
				{/* {this.state.loader ? <Loader /> : */}
				<Router>
					<div>
						<Navigation
							games={this.state.games} channels={this.state.channels}
						/>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/categories" component={Categories} />
							<Route exact path="/channelpage" component={ChannelPage} />
							<Route exact path="/gamepage" component={GamePage} />
							<Route exact path="/popular-channels" component={PopularChannelsPage} />
						</Switch>
					</div>
				</Router>
			// }
			</div>
		);
	}
}
// const App = () => {
// 	return (
// 		<div>
// 			<Router>
// 				<div>
// 					<Navigation />
// 					<Switch>
// 						<Route exact path="/" component={Home} />
// 						<Route exact path="/categories" component={Categories} />
// 						<Route exact path="/channelpage" component={ChannelPage} />
// 						<Route exact path="/gamepage" component={GamePage} />
// 						<Route exact path="/popular-channels" component={PopularChannelsPage} />
// 					</Switch>
// 				</div>
// 			</Router>
// 		</div>
// 	);
// };

export default App;
