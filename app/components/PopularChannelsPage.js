import React from "react";
import StreamCard from "./StreamCard";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function PopularChannelsPage(props) {
    var { location } = props;
    var { channels } = location.state;


    window.scrollTo(0, 0)


    return (<div className="channels_container">
        {channels.map(function (suggestedStreamer) {
            return (
                <div className="live-channel-image" key={suggestedStreamer.id}>
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
            );
        })}
    </div>
    )
}


export default PopularChannelsPage;