import React from 'react'
import { connect } from 'react-redux'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { setPlayerState, setPlayerCurrentTrack } from '../actions/player'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

const Flock = ({ dispatch, subreddits, isFetching, links, error, playerState }) => {
    return (
        <div>
            <h1>Flock</h1>
            <SubredditSelector
                subreddits={subreddits}
                updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                fetchTracks={subreddits => dispatch(fetchLinks(subreddits))}
            />
            { links && links.length > 1 &&
                <Player
                    tracks={links}
                    currentTrack={playerState.currentTrack}
                    onPlayerStateChange={state => dispatch(setPlayerState(state))}
                    onTrackChange={track => dispatch(setPlayerCurrentTrack(track))}
                />
            }
            { !error ?
                <TrackList
                    isFetching={isFetching}
                    tracks={links}
                    onTrackClicked={track => {
                        if (playerState.currentTrack !== track.id) {
                            dispatch(setPlayerCurrentTrack(track))
                        }
                    }}
                    currentTrack={playerState.currentTrack}
                />
                : <div style={{color: 'red'}}>
                    {error}
                </div>
            }
                
        </div>
    )
}

const mapStateToProps = ({ subreddits, links, player }) => {
    return {
        subreddits,
        isFetching: links.isFetching,
        links: links.links,
        error: links.error,
        playerState: player
    }
}

export default connect(mapStateToProps)(Flock)
