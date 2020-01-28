import React from 'react';
import { Link } from "react-router-dom";
import StreamCard from './StreamCard';

function GamePage(props) {
    var { games, channels } = props;
    var streamCollection = [];

    // get the game that matches the game in the url
    var gameId;
    var gameName;
    games.map(game => {
        var currentPath = location.pathname;
        var directories = currentPath.split("/");
        var lastDirectory = directories[(directories.length - 1)];
        var decodedGameName = decodeURIComponent(lastDirectory)

        if (decodedGameName === game.name) {
            gameId = game.id
            gameName = game.name
        }
    })

    channels.map(channel => {
        if (channel.game_id === gameId) {
            streamCollection.push(channel)
        }
    })

    return (
        <div className="game-page-container">
            <h1>{gameName}</h1>
            <div className="border"></div>
            <div className="game-page-wrapper">
                {streamCollection.map(suggestedStreamer => {
                    return (<div className="live-channel-container" key={suggestedStreamer.id}>
                        <div className="live-channel-image">
                            <Link
                                to={`/${suggestedStreamer.user_name}`}
                            >
                                <StreamCard suggestedStreamer={suggestedStreamer} />
                            </Link>
                        </div>

                    </div>)
                })}
            </div>

        </div>
    )
}

export default GamePage