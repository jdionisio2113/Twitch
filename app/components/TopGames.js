import React from "react";
// var Link = require("react-router-dom").Link;

function TopGames(props) {
  var { games } = props;

  return (
    <div className="top-games-container">
      <div className="game-category">
        <h6 className="top-games">Top Games</h6>
        {/* <Link className="see-All_link" to="/categories">
          See All
        </Link> */}
        <p className="see-All_link">See All</p>
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
  );
}

export default TopGames;
