import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { PlayerState, setPlayerState, setPlayerCurrentTrack } from '../actions/player'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

const arrayEquals = (lhs, rhs) => {
    if (!lhs || !rhs) {
        return false
    }

    if (lhs.length !== rhs.length) {
        return false
    }

    let equals = true
    for (var i = lhs.length - 1; i >= 0; i--) {
        equals = (lhs[i] === rhs[i])
        if (!equals) {
            break
        }
    }
    return equals
}

class Flock extends Component {

    constructor (props) {
        super(props)

        this._assignPlayer = player => this.player = player
    }

    componentWillMount () {
        const {
            dispatch,
            params
        } = this.props

        let {
            subreddits = ''
        } = this.props.params

        subreddits = subreddits.split('+').filter(subreddit => subreddit)

        if (subreddits && subreddits.length > 0) {
            dispatch(updateSubreddits(subreddits.join(' ')))
            dispatch(fetchLinks(subreddits))
        }
    }

    render () {
        const {
            dispatch,
            isFetching,
            links,
            error,
            playerState,
            history
        } = this.props

        let {
            subreddits = ''
        } = this.props.params

        subreddits = subreddits.split('+')

        return (
            <div>
                <h1 style={{color: 'darkgoldenrod'}}>Flock</h1>
                <SubredditSelector
                    subreddits={subreddits}
                    updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                    fetchTracks={subs => {
                        const subredditList = subs.split(' ').sort()
                        const subredditsCopy = subreddits.concat().sort()
                        if (!arrayEquals(subredditList, subredditsCopy)) {
                            hashHistory.push(`${subredditList.join('+')}`)
                            dispatch(updateSubreddits(subs))
                            dispatch(fetchLinks(subredditList))
                        }
                    }}
                />
                { isFetching ? (
                    <div>
                        <h2>Fetching tracks...</h2>
                    </div>
                ) : (
                    (links && links.length > 0) &&
                    <div>
                        <Player
                            tracks={links}
                            currentTrack={playerState.currentTrack}
                            onPlayerReady={this._assignPlayer}
                            onPlayerStateChange={state => dispatch(setPlayerState(state))}
                            onTrackChange={track => dispatch(setPlayerCurrentTrack(track))}
                        />
                        <TrackList
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