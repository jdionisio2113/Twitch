import React from "react";
import Home from "./App";
import ScrollToTop from './ScrollToTop';
import Loader from "./Loader";
import api from '../config/api';
import { Link } from "react-router-dom";

class Categories extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		var { games, channels } = this.props;
		// var { location } = this.props;
		// var { channels, games } = location.state;

		// console.log(games);
		// console.log(channels)

		return (
			<div className="category-container">
				{games.map(function (item) {
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
							to={`/categories/${item.name}`}
						>
							<img className="category_logo" src={item.box_art_url} />
							<div className="game-description">
								<h6 className="game-title">{item.name}</h6>
							</div>
						</Link>
					);
				})}
				<ScrollToTop />
			</div>
		);

	}
}

export default Categories;
