import React from 'react';
import StreamCard from './StreamCard';
import { Link } from 'react-router-dom';

function PopularChannelsPage(props) {
    var { location } = props;
    var { channels } = location.state;

    console.log(channels);

    return (<div className="channels_container">
        {channels.map(function (item) {
            return (
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
                        <StreamCard item={item} />
                    </Link>
                </div>
            );

        })}
    </div>
    )
}


export default PopularChannelsPage;