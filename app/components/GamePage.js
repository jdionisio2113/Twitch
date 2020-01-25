import React from 'react';
import api from '../config/api';
import { Link } from "react-router-dom";
import StreamCard from './StreamCard';

// class GamePage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             game: ''
//         }

//         this.categoryStreams = this.categoryStreams.bind(this);
//     }

//     categoryStreams() {

//         var { games, channels } = this.props;
//         var streamCollection = [];

//         // get the game that matches the game in the url
//         var gameId;
//         // var gameName;
//         games.map(game => {
//             var currentPath = location.pathname;
//             var directories = currentPath.split("/");
//             var lastDirectory = directories[(directories.length - 1)];
//             var decodedGameName = decodeURIComponent(lastDirectory)
//             var gameName = game.name;

//             if (decodedGameName === gameName) {
//                 gameId = game.id
//             }
//         })


//         channels.map(channel => {
//             if (channel.game_id === gameId) {
//                 streamCollection.push(channel)
//             }
//         })


//         return streamCollection.map(suggestedStreamer => {

//             var stream = suggestedStreamer.thumbnail_url

//             var viewers = suggestedStreamer.viewer_count;
//             var streamViewers = viewers.toLocaleString();
//             let newURL = suggestedStreamer.thumbnail_url
//                 .replace("{width}", "650")
//                 .replace("{height}", "400");
//             suggestedStreamer.thumbnail_url = newURL;

//             return (<div className="live-channel-container" key={suggestedStreamer.id}>
//                 <div className="live-channel-image">
//                     <Link
//                         to={{
//                             pathname: "/channelpage",
//                             search: "?streamer=" + suggestedStreamer.user_name,
//                             state: {
//                                 suggestedResult: suggestedStreamer
//                             }
//                         }}
//                     >
//                         {/* <Link> */}
//                         <StreamCard suggestedStreamer={suggestedStreamer} />
//                     </Link>
//                 </div>

//             </div>)
//         })


//         // for (let i = 0; i < streamCollection.length; i++) {

//         //     var stream = streamCollection[i].thumbnail_url

//         //     return (
//         //         <>
//         //             <img src={stream} />
//         //         </>
//         //     )
//         // }
//     }

//     render() {
//         var { games, channels } = this.props;

//         var gameName;
//         var gameId;
//         games.map(game => {
//             var currentPath = location.pathname;
//             var directories = currentPath.split("/");
//             var lastDirectory = directories[(directories.length - 1)];
//             var sd = lastDirectory.replace(/%|20/g, '');
//             var name = game.name.replace(/\s/g, '');

//             if (sd === name) {
//                 gameName = game.name
//                 gameId = game.id
//             }
//         })
//         return (
//             <div className="game-page-container">
//                 <h1>{gameName}</h1>
//                 <div className="border"></div>
//                 <div className="game-page-wrapper">
//                     {this.categoryStreams()}
//                 </div>

//             </div>
//         )
//     }
// }

// export default GamePage

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
        // var gameName = game.name;

        if (decodedGameName === game.name) {
            gameId = game.id
            gameName = game.name
        }
    })
    // console.log(gameName)

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
                                to={{
                                    pathname: "/channelpage",
                                    search: "?streamer=" + suggestedStreamer.user_name,
                                    state: {
                                        suggestedResult: suggestedStreamer
                                    }
                                }}
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