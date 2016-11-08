import React from 'react'
import Track from './Track.jsx'

const TrackList = ({ tracks, currentTrack, playerState, onTrackClicked }) => {
    return (
        <div className="ui relaxed divided list">
            {
                tracks.map(track => {
                    return (
                        <Track
                            key={track.id}
                            track={track}
                            playing={track.id === currentTrack}
                            playerState={playerState}
                            onTrackClicked={onTrackClicked}
                        />
                    )
                })
            }
        </div>
    )
}

export default TrackList