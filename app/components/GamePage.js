import React from 'react';
import api from '../config/api';
import { Link } from "react-router-dom";

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.categoryStreams = this.categoryStreams.bind(this);
    }

    categoryStreams() {
        var { match, location } = this.props;
        var { suggestedGame, suggestedChannel } = location.state;

        console.log(suggestedChannel)
        console.log(suggestedGame)

        var arr = []
        suggestedChannel.map(item => {
            console.log(item)

            if (item.game_id === suggestedGame.id) {
                arr.push(item)
                // console.log(arr)
            }
        })

        console.log(arr)
        // var x;
        return arr.map(item => {
            x = item.thumbnail_url
            var caption = item.title;
            var length = 33;
            var trimmedChannelCaption =
                caption.length > length
                    ? caption.substring(0, length - 3) + "..."
                    : caption;

            var viewers = item.viewer_count;
            var streamViewers = viewers.toLocaleString();
            let newURL = item.thumbnail_url
                .replace("{width}", "650")
                .replace("{height}", "400");
            item.thumbnail_url = newURL;
            return (<div className="live-channel-container">
                {/* <img src={item.thumbnail_url} /> */}


                <div className="live-channel-image" key={item.id}>
                    <Link
                        to={{
                            pathname: "/channelpage",
                            search: "?streamer=" + item.user_name,
                            state: {
                                suggestedResult: item
                            }
                        }}
                    >
                        <div className="live-channel-box">
                            <img
                                className="live-channel-banner"
                                src={item.thumbnail_url}
                            />
                            <div className="viewer-container">
                                <img
                                    className="red-img"
                                    src={require("../img/red-circle.png")}
                                />
                                <p className="channelViewers">{streamViewers} viewers</p>
                            </div>
                            <div className="channel-link">
                                {/* <img className="channel-logo" src={item.channel.logo} /> */}
                                <div className="channel-description">
                                    <h3 className="channel-name">
                                        {item.user_name}
                                    </h3>
                                    <p className="channel-caption">{trimmedChannelCaption}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>)
        })


        for (let i = 0; i < arr.length; i++) {

            var x = arr[i].thumbnail_url
        }

        return <div>
            <img src={x} />
        </div>
    }

    render() {
        var { match, location } = this.props;
        var { suggestedGame, suggestedChannel } = location.state;
        return (
            <div className="game-page-container">
                <h1>{suggestedGame.name}</h1>
                <div className="border"></div>
                <div className="game-page-wrapper">
                    {this.categoryStreams()}
                </div>

            </div>
        )
    }
}

export default GamePage