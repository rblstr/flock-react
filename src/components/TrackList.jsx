import React from 'react'

import TrackListItem from './TrackListItem.jsx'

const TrackList = ({ tracks, currentTrack, playerState, onPlayTrack }) => {
    return (
        <ol>
            {
                tracks.map(track => <TrackListItem
                    key={track.id}
                    track={track}
                    active={track === currentTrack}
                    playerState={playerState}
                    onPlayTrack={onPlayTrack} 
                />)
            }
        </ol>
    )
}

export default TrackList
