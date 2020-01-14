import React from 'react';
import api from '../config/api';
import { Link } from "react-router-dom";
import StreamCard from './StreamCard';

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.categoryStreams = this.categoryStreams.bind(this);
    }

    categoryStreams() {
        var { location } = this.props;
        var { suggestedGame, suggestedChannel } = location.state;

        var streamCollection = []

        suggestedChannel.map(item => {
            if (item.game_id === suggestedGame.id) {
                streamCollection.push(item)
            }
        })

        return streamCollection.map(item => {

            stream = item.thumbnail_url

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
                        <StreamCard item={item} />
                    </Link>
                </div>

            </div>)
        })


        for (let i = 0; i < streamCollection.length; i++) {

            var stream = streamCollection[i].thumbnail_url
        }

        return (
            <>
                <img src={stream} />
            </>
        )
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