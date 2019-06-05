import React from "react";
// var Link = require("react-router-dom").Link;
// import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function TopGames(props) {
  var { games } = props;

  const settings = {
    dots: true,
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
          <Link className="see-All_link" to="/categories">
            See All
          </Link>
          {/* <p className="see-All_link">See All</p> */}
        </div>
        {/* <div className="scrollMenu"> */}
        <Slider {...settings}>
          {games.map(function(item, index) {
            var gameName = item.game.name;
            return (
              <div key={index} className="game_container">
                <a
                  href={`https://www.twitch.tv/directory/game/${gameName}`}
                  target="_blank"
                >
                  <img className="logo" src={item.game.box.large} />
                </a>
                {/* <h1>{item.game.name}</h1> */}
              </div>
            );
          })}
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
}

TopGames.propTypes = {
  games: PropTypes.array.isRequired
};

export default TopGames;
