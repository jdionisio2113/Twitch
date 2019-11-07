import React from 'react';
import api from '../config/api'

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stream: ""
        }

        this.categoryStreams = this.categoryStreams.bind(this);
    }

    categoryStreams() {
        var { match, location } = this.props;
        var { suggestedGame, suggestedChannel } = location.state;

        console.log(suggestedGame)

        // api.get("https://api.twitch.tv/helix/streams?first=100").then(res => {
        //     // var x = (suggestedGame.id)
        //     // console.log(x)
        //     var data = res.data.data;
        //     // console.log(data)
        //     for (let i = 0; i < data.length; i++) {
        //         let streamId = data[i].game_id;
        //         let stream = data[i];
        //         // console.log(suggestedGame.id)
        //         // console.log(streamId)
        //         if (streamId === suggestedGame.id) {
        //             console.log(stream)

        //         }
        //     }

        // })
        // console.log(stream)

        return <div><h1>GamePage</h1>
            {/* <img src={this.state.stream} /> */}
        </div>
    }

    render() {
        return (
            <div className="game-page-container">{this.categoryStreams()}</div>
        )
    }
}

export default GamePage