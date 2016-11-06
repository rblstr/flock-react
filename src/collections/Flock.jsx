import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { PlayerState, setPlayerState, setPlayerCurrentTrack } from '../actions/player'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

class Flock extends Component {

    constructor (props) {
        super(props)

        this._assignPlayer = player => this.player = player
    }

    render () {
        const { dispatch, subreddits, isFetching, links, error, playerState } = this.props
        return (
            <div>
                <h1>Flock</h1>
                <SubredditSelector
                    subreddits={subreddits}
                    updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                    fetchTracks={subreddits => dispatch(fetchLinks(subreddits))}
                />
                { !error && (links && links.length > 0) ?
                    <div>
                        <Player
                            tracks={links}
                            currentTrack={playerState.currentTrack}
                            onPlayerReady={this._assignPlayer}
                            onPlayerStateChange={state => dispatch(setPlayerState(state))}
                            onTrackChange={track => dispatch(setPlayerCurrentTrack(track))}
                        />
                        <TrackList
                            isFetching={isFetching}
                            tracks={links}
                            onTrackClicked={track => {
                                if (track.id != playerState.currentTrack) {
                                    this.player.playTrack(track)
                                } else {
                                    if (playerState.state == PlayerState.PLAYING) {
                                        this.player.pause()
                                    } else if (playerState.state === PlayerState.PAUSED) {
                                        this.player.play()
                                    }
                                }
                            }}
                            currentTrack={playerState.currentTrack}
                        />
                    </div>
                    : <div style={{color: 'red'}}>
                        {error}
                    </div>
                }
            </div>
        )
    }
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