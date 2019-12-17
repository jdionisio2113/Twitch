import React from 'react';
import StreamCard from './StreamCard';
import { Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

function PopularChannelsPage(props) {
    var { location } = props;
    var { channels } = location.state;


    window.scrollTo(0, 0)


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
        <ScrollToTop />
    </div>
    )
}


export default PopularChannelsPage;