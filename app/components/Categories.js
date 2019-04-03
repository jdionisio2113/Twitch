import React from "react";
import Home from "./App";
import axios from "axios";
import apiKey from "../config/apiKey";

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };

    // this.getTopGames = this.getTopGames.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://api.twitch.tv/kraken/games/top?client_id=${apiKey}&limit=50`
      )
      .then(res => {
        var game = res.data.top;

        this.setState({
          games: game
        });
      });
  }

  render() {
    const { games } = this.state;
    console.log({ games });
    return (
      <div className="category-container">
        {games.map(function(item) {
          var viewers = item.viewers;

          var gameViewers = viewers.toLocaleString();
          return (
            <div key={item.game._id} className="game_container2">
              <img className="category_logo" src={item.game.box.medium} />
              <div className="game-description">
                <h6 className="game-title">{item.game.name}</h6>
                <p className="game-viewers">{gameViewers} viewers</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Categories;
