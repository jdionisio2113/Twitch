import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function TopGames(props) {
	var { games, channels } = props;

	const settings = {
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}
		]
	};

	return (
		<div className="top-games-box">
			<div className="top-games-container">
				<div className="game-category">
					<h6 className="top-games">Top Games</h6>
					<Link className="see-All_link"
						to={"/directory"}
					>
						See All
					</Link>
				</div>

				<Slider {...settings}>
					{games.map(function (game, index) {

						var gameName = game.name;
						let newURL = game.box_art_url
							.replace("{width}", "450")
							.replace("{height}", "700");
						game.box_art_url = newURL;

						return (
							<div key={index} className="game_container">
								<Link
									to={`/directory/game/${gameName}`}
								>
									<img className="logo" src={game.box_art_url} />
								</Link>
							</div>
						);
					})}
				</Slider>

			</div>
		</div>
	);
}

TopGames.propTypes = {
	games: PropTypes.array.isRequired
};

export default TopGames;
