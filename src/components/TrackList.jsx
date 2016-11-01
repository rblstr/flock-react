import React from 'react'
import Track from './Track.jsx'

export default ({ isFetching, tracks, currentTrack, onTrackClicked }) => {
    return (
        <div>
            { isFetching ? <h2>Fetching...</h2> :
                <ol>
                    {
                        tracks.map(track => {
                            return (
                                <li key={track.id}>
                                    <Track track={track} playing={track.id === currentTrack} onTrackClicked={onTrackClicked} />
                                </li>
                            )
                        })
                    }
                </ol>
            }
        </div>
    )
}
