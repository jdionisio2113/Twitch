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

        var streamCollection = []
        suggestedChannel.map(item => {
            console.log(item)

            if (item.game_id === suggestedGame.id) {
                streamCollection.push(item)
            }
        })

        return streamCollection.map(item => {
            stream = item.thumbnail_url
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

            return (<div className="live-channel-container" key={item.id}>
                <div className="live-channel-image">
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


        for (let i = 0; i < streamCollection.length; i++) {

            var stream = streamCollection[i].thumbnail_url
        }

        return <div>
            <img src={stream} />
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