import React from 'react';
import truncateString from '../utils/truncateString';

function StreamCard(props) {
    var { item } = props

    var viewers = item.viewer_count;
    var streamViewers = viewers.toLocaleString();
    let newURL = item.thumbnail_url
        .replace("{width}", "650")
        .replace("{height}", "400");
    item.thumbnail_url = newURL;

    return <div className="live-channel-box">
        <img
            className="live-channel-banner channel-preview"
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
                <p className="channel-caption">{truncateString(item.title, 33)}</p>
            </div>
        </div>
    </div>
}

export default StreamCard