import React from "react";
import ScrollToTop from './ScrollToTop';
import { Link } from "react-router-dom";


function Categories(props) {

	var { games } = props;

	return (
		<div className="category-container">
			{games.map(function (game) {
				var viewers = game.viewers;
				var gameName = game.name;
				let newURL = game.box_art_url
					.replace("{width}", "450")
					.replace("{height}", "700");
				game.box_art_url = newURL;
				return (
					<Link
						key={game.id}
						className="game_container2"
						to={`/directory/game/${game.name}`}
					>
						<img className="category_logo" src={game.box_art_url} />
						<div className="game-description">
							<h6 className="game-title">{game.name}</h6>
						</div>
					</Link>
				);
			})}
			<ScrollToTop />
		</div>
	)
}

export default Categories