import React from "react";
import Home from "./App";
import axios from "axios";
import apiKey from "../config/apiKey";

// function Categories(props) {
//   var { games } = props;

//   return (
//     <div className="categoryMenu">
//       {games.map(function(item, index) {
//         // console.log(item.game.logo.large);
//         return (
//           <div key={index} className="game_container">
//             <img className="logo" src={item.game.box.large} />
//             {/* <h1>{item.game.name}</h1> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

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
      <div>
        {games.map(function(item, index) {
          return (
            <div key={index} className="game_container2">
              <img className="category_logo" src={item.game.box.medium} />
              <p>{item.game.name}</p>
              {/* <h1>{item.game.name}</h1> */}
            </div>
          );
        })}
      </div>
    );
  }
}

// const Categories = props => {
//   var { games } = props;

//   return (
//     <div>
//       <p>New World</p>
//     </div>
//   );
// };

export default Categories;
