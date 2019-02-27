var React = require("react");

function TopGames(props) {
  var { games } = props;

  return (
    <div className="scrollMenu">
      {games.map(function(item, index) {
        // console.log(item.game.logo.large);
        return (
          <div key={index} className="game_container">
            <img className="logo" src={item.game.logo.medium} />
            {/* <h1>{item.game.name}</h1> */}
          </div>
        );
      })}
    </div>
  );
}

module.exports = TopGames;
