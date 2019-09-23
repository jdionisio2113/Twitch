import React from "react";
import Form from "./Form";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

class StreamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetID: "twitch-embed"
        };
        this.updateTwitchStream = this.updateTwitchStream.bind(this);
    }

    updateTwitchStream() {
        var { match, location } = this.props;
        var { stream } = location.state;
    }

    componentDidMount() {
        this.updateTwitchStream()
    }

    render() {
        var stream = this.props.location.state.stream;
        console.log(stream)
        return (
            <div>
                <h1 className="hello">hi</h1>
            </div>
        );
    }
}

export default StreamPage;
