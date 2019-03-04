import React from "react";

function TopGames(props) {
  var { games } = props;

  return (
    <div className="top-games-container">
      <h6 className="top-games">Top Games</h6>
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
