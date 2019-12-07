import React from "react";
import Home from "./App";
import axios from "axios";
import apiKey from "../config/apiKey";
import Loader from "./Loader";
import api from '../config/api';
import { Link } from "react-router-dom";

class Categories extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// games: [],
			loader: false,
			// channels: []
		};

		this.browse = this.browse.bind(this);
	}

	browse() {
		var { match, location } = this.props;
		var { games, channels } = location.state;
		// this.setState({ loader: false });
		return (
			<div className="category-container">
				{games.map(function (item) {
					// console.log(item)
					var viewers = item.viewers;
					var gameName = item.name;
					let newURL = item.box_art_url
						.replace("{width}", "450")
						.replace("{height}", "700");
					item.box_art_url = newURL;

					return (
						<Link
							key={item.id}
							className="game_container2"
							to={{
								pathname: "/gamepage",
								search: "?game=" + item.name,
								state: {
									suggestedGame: item,
									suggestedChannel: channels
								}
							}}
						>
							<img className="category_logo" src={item.box_art_url} />
							<div className="game-description">
								<h6 className="game-title">{item.name}</h6>
								{/* <p className="game-viewers">{gameViewers} viewers</p> */}
							</div>
						</Link>
						// </a>
					);
				})}

			</div>
		);
	}

	componentDidMount() {
		this.setState({ loader: true });
	}


	render() {
		var loader = this.state.loader;
		// console.log(this.state.channels)
		if (loader === true) {
			return <Loader />;
		}
		return (
			<>
				{this.browse()}
			</>
		)
	}
}

export default Categories;
