import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { PlayerState, setPlayerState, setPlayerCurrentTrack } from '../actions/player'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

import { arrayEquals } from '../utils'

class Flock extends Component {

    constructor (props) {
        super(props)

        const { dispatch } = this.props

        this._assignPlayer = player => this.player = player
        this._onFetchTracks = subreddits => this.onFetchTracks(subreddits)
        this._onPlayerStateChange = state => dispatch(setPlayerState(state))
        this._onTrackChange = track => dispatch(setPlayerCurrentTrack(track))
        this._onTrackClicked = track => this.onTrackClicked(track)
    }

    componentWillMount () {
        const {
            dispatch,
            params: {
                subreddits = ''
            }
        } = this.props

        const splitSubreddits = subreddits.split('+').filter(subreddit => subreddit)

        if (splitSubreddits && splitSubreddits.length > 0) {
            dispatch(updateSubreddits(splitSubreddits))
            dispatch(fetchLinks(splitSubreddits))
        }
    }

    onFetchTracks (subreddits) {
        const { dispatch, subreddits: stateSubreddits } = this.props
        const sortedSubreddits = subreddits.concat().sort()
        const sortedStateSubreddits = stateSubreddits.concat().sort()
        if (!arrayEquals(sortedSubreddits, sortedStateSubreddits)) {
            hashHistory.push(`${subreddits.join('+')}`)
            dispatch(updateSubreddits(subreddits))
            dispatch(fetchLinks(subreddits))
        }
    }

    onTrackClicked (track) {
        const { dispatch, playerState: { currentTrack, state } } = this.props
        if (track.id != currentTrack) {
            this.player.playTrack(track)
        } else {
            if (state == PlayerState.PLAYING) {
                this.player.pause()
            } else if (state === PlayerState.PAUSED) {
                this.player.play()
            }
        }
    }

    render () {
        const {
            dispatch,
            isFetching,
            links,
            error,
            playerState,
            params: {
                subreddits: paramSubreddits = ''
            }
        } = this.props

        const subreddits = paramSubreddits.split('+').filter(subreddit => subreddit)

        return (
            <div className="ui text container">
                <h1 className="ui yellow header">Flock</h1>
                <SubredditSelector
                    subreddits={subreddits}
                    fetchTracks={this._onFetchTracks}
                    isFetching={isFetching}
                />
                { isFetching ? (
                    <div>
                        <h2>Fetching tracks...</h2>
                    </div>
                ) : (
                    (links && links.length > 0) &&
                    <div className="ui one column grid">
                        <div className="center aligned row">
                            <div className="column">
                                <Player
                                    tracks={links}
                                    currentTrack={playerState.currentTrack}
                                    onPlayerReady={this._assignPlayer}
                                    onPlayerStateChange={this._onPlayerStateChange}
                                    onTrackChange={this._onTrackChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <TrackList
                                    tracks={links}
                                    currentTrack={playerState.currentTrack}
                                    playerState={playerState.state}
                                    onTrackClicked={this._onTrackClicked}
                                />
                            </div>
                        </div>
                    </div>
                )}
                { error &&
                    <div style={{color: 'red'}}>
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