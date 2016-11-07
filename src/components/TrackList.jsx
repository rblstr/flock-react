import React from 'react'
import Track from './Track.jsx'

const TrackList = ({ tracks, currentTrack, onTrackClicked }) => {
    return (
        <div>
            <ol>
                {
                    tracks.map(track => {
                        return (
                            <li key={track.id}>
                                <Track
                                    track={track}
                                    playing={track.id === currentTrack}
                                    onTrackClicked={onTrackClicked}
                                />
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

export default TrackList