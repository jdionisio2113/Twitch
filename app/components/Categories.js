import React from "react";
import Home from "./App";
import axios from "axios";
import apiKey from "../config/apiKey";
import Loader from "./Loader";
import api from '../config/api'

class Categories extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			games: [],
			loader: false
		};

		// this.getTopGames = this.getTopGames.bind(this);
	}

	componentDidMount() {
		this.setState({ loader: true });
		// axios
		// 	.get(
		// 		`https://api.twitch.tv/kraken/games/top?client_id=${apiKey}&limit=50`
		// 	)
		// 	.then(res => {
		// 		var game = res.data.top;

		// 		this.setState({
		// 			games: game,
		// 			loader: false
		// 		});
		// 	});
		api.get("https://api.twitch.tv/helix/games/top")
		.then(res=>{
			var game = res.data.data;
			console.log(game)
			this.setState({
							games: game,
							loader: false
						});

		})
	}

	render() {
		const { games } = this.state;
		var loader = this.state.loader;

		if (loader === true) {
			return <Loader />;
		}
		return (
			<div className="category-container">
				{games.map(function (item) {
					var viewers = item.viewers;
					var gameName = item.name;
					let newURL = item.box_art_url
							.replace("{width}", "450")
							.replace("{height}", "700");
						item.box_art_url = newURL;

					// var gameViewers = viewers.toLocaleString();
					return (
						<a
							key={item.id}
							className="game_container2"
							href={`https://www.twitch.tv/directory/game/${gameName}`}
							target="_blank"
						>
							<img className="category_logo" src={item.box_art_url} />
							<div className="game-description">
								<h6 className="game-title">{item.name}</h6>
								{/* <p className="game-viewers">{gameViewers} viewers</p> */}
							</div>
						</a>
					);
				})}
				
			</div>
		);
	}
}

export default Categories;
