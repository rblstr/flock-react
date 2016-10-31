import React from 'react'

const upvoteStyle = {
    color: 'orangered'
}

const downvoteStyle = {
    color: '#9494FF'
}

const playingStyle = {
    color: '#00FF00'
}

export default ({ track, playing, onPlayTrack }) => {
    return (
        <div>
            <span
                style={playing ? playingStyle : {}}
                onClick={e => onPlayTrack(track)}
            >{track.title}</span>
            <div>
                <a href={track.permalink}>Permalink</a>&nbsp;
                <a href={track.url}>YouTube</a>&nbsp;
                <span style={upvoteStyle}>{track.ups}</span>:<span style={downvoteStyle}>{track.downs}</span>
            </div>
        </div>
    )
}