import React from 'react'

const upvoteStyle = {
    color: 'darkgoldenrod'
}

const downvoteStyle = {
    color: '#9494FF'
}

const playingStyle = {
    color: 'goldenrod'
}

const subredditStyle = {
    color: '#666666',
    fontStyle: 'italic'
}

const Track = ({ track, playing, onTrackClicked }) => {
    return (
        <div>
            <span
                style={playing ? playingStyle : {}}
                onClick={e => onTrackClicked(track)}
            >{track.title}</span>&nbsp;<span style={subredditStyle}>{track.subreddit}</span>
            <div>
                <a href={track.permalink}>Permalink</a>&nbsp;
                <a href={track.url}>YouTube</a>&nbsp;
                <span style={upvoteStyle}>{track.ups}</span>:<span style={downvoteStyle}>{track.downs}</span>
            </div>
        </div>
    )
}

export default Track