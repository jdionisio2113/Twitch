import React from "react";
import FeaturedStreams from "./FeaturedStreams";
import TopGames from "./TopGames";
import LiveChannels from "./LiveChannels";
import { all, get } from "axios";
import api from "../config/api";
import Loader from "./Loader";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            featured: [],
            games: [],
            channels: [],
            loader: true,
            currentStream: {}
        };

        this.fetchTwitchData = this.fetchTwitchData.bind(this);
        this.updateCurrentStream = this.updateCurrentStream.bind(this);
    }

	/**
	 * Fetches arrays of featured streamers, games, and channels.
	 * Stores the arrays inside of state.
	 * @param Array featured 
	 * @param Array game 
	 * @param Array channels 
	 */
    fetchTwitchData(featured, games, channels) {

        all([api.get(featured), api.get(games), api.get(channels)]).then(
            res => {
                var featured = res[0].data.data;
                var games = res[1].data.data;
                var channels = res[2].data.data;

                this.setState({
                    games,
                    featured,
                    channels,
                    loader: false,
                    currentStream: featured[0]
                });
            }
        )
    }


    componentDidMount() {
        this.fetchTwitchData("https://api.twitch.tv/helix/streams?first=5", "https://api.twitch.tv/helix/games/top", "https://api.twitch.tv/helix/streams?first=100")
    }

	/**
	 * Move up and down the featured streams array to find next
	 * or previous string
	 * @param String direction (i.e 'next' or 'prev)
	 * @return
	 */
    updateCurrentStream(direction) {
        var { currentStream, featured } = this.state;

        var indexOfCurrentStream = featured.indexOf(currentStream);

        if (direction === 'next' && indexOfCurrentStream < (featured.length - 1)) {
            indexOfCurrentStream++;
        }

        if (direction === 'prev' && indexOfCurrentStream > 0) {
            indexOfCurrentStream--;
        }

        this.setState({
            currentStream: featured[indexOfCurrentStream]
        });
    }

    render() {
        var loader = this.state.loader;

        if (loader === true) {
            return <Loader />;
        }

        return (
            <div className="main-container">
                <FeaturedStreams currentStream={this.state.currentStream} featured={this.state.featured} updateCurrentStream={this.updateCurrentStream} />
                <TopGames games={this.state.games} channels={this.state.channels} />
                <LiveChannels channels={this.state.channels} />
            </div>
        );
    }
}

export default Home;