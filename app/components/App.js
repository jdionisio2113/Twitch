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


const App = () => {
	return (
		<div>
			<Router>
				<div>
					<Navigation />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/channelpage" component={ChannelPage} />
						<Route exact path="/gamepage" component={GamePage} />
						<Route exact path="/popular-channels" component={PopularChannelsPage} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
