import React from "react";
// var Link = require("react-router-dom").Link;
// import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function TopGames(props) {
  var { games } = props;

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 3
  // };
  return (
    // <div>
    //   <Slider {...settings}>
    <div className="top-games-container">
      <div className="game-category">
        <h6 className="top-games">Top Games</h6>
        <Link className="see-All_link" to="/categories">
          See All
        </Link>
        {/* <p className="see-All_link">See All</p> */}
      </div>
      <div className="scrollMenu">
        {games.map(function(item, index) {
          // console.log(item.game.logo.large);
          return (
            <div key={index} className="game_container">
              <img className="logo" src={item.game.box.large} />
              {/* <h1>{item.game.name}</h1> */}
            </div>
          );
        })}
      </div>
    </div>
    //   </Slider>
    // </div>
  );
}

export default TopGames;
