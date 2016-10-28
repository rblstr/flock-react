import React from 'react'
import Track from './Track.jsx'

export default ({ isFetching, tracks }) => {
    return (
        <div>
            { isFetching ? <h2>Fetching...</h2> :
                <ol>
                    {
                        tracks.map(track => {
                            return (
                                <li key={track.id}>
                                    <Track track={track} />
                                </li>
                            )
                        })
                    }
                </ol>
            }
        </div>
    )
}
