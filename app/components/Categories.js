import React from "react";

function Categories(props) {
  var { games } = props;

  return (
    <div className="categoryMenu">
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
  );
}

export default Categories;
