import React from 'react'

import { PlayerState } from './YouTubePlayerComponent.jsx'

const TrackListItem = ({ track, active, playerState, onPlayTrack }) => {
    const style = {
        backgroundColor: active ? 'grey' : undefined,
        color: (playerState === PlayerState.PLAYING && active) ? 'gold' : undefined,
        cursor: 'pointer'
    }
    return (
        <li>
            <span><span style={style} onClick={() => onPlayTrack(track)}>{track.title}</span> - <a href={track.permalink} target="_blank">permalink</a> - <a href={track.url} target="_blank">YouTube</a></span>
        </li>
    )
}

export default TrackListItem
