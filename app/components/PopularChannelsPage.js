import React from "react";
import StreamCard from "./StreamCard";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function PopularChannelsPage(props) {
    var { channels } = props;

    window.scrollTo(0, 0)


    return (<div className="channels_container">
        {channels.map(function (suggestedStreamer) {
            return (
                <div className="live-channel-image" key={suggestedStreamer.id}>
                    <Link
                        to={`/directory/${suggestedStreamer.user_name}`}
                    >
                        <div className="popular_channel">
                            <StreamCard suggestedStreamer={suggestedStreamer} />
                        </div>
                    </Link>
                </div>
            );
        })}
    </div>
    )
}


export default PopularChannelsPage;