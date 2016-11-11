import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'

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
        const { dispatch, params: { subreddits = '' } } = this.props

        const splitSubreddits = subreddits.split('+').filter(subreddit => subreddit)

        if (splitSubreddits && splitSubreddits.length > 0) {
            dispatch(updateSubreddits(splitSubreddits))
            dispatch(fetchLinks(splitSubreddits))
        }
    }

    componentDidUpdate (prevProps) {
        let { dispatch, params: { subreddits = '' } } = this.props
        let { params: { subreddits: prevSubreddits = '' } } = prevProps
        subreddits = subreddits.split('+').filter(subreddit => subreddit).sort()
        prevSubreddits = prevSubreddits.split('+').filter(subreddit => subreddit).sort()
        if (!arrayEquals(subreddits, prevSubreddits)) {
            dispatch(updateSubreddits(subreddits))
            dispatch(fetchLinks(subreddits))
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
        if (track.id !== currentTrack) {
            this.player.playTrack(track)
        } else {
            if (state === PlayerState.PLAYING) {
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
                <div className="ui masthead basic segment">
                    <Link to="/">
                        <h1 className="ui yellow header">Flock</h1>
                    </Link>
                    <SubredditSelector
                        subreddits={subreddits}
                        fetchTracks={this._onFetchTracks}
                    />
                    { error &&
                        <div className="ui error message">
                            <p>{error}</p>
                        </div>
                    }
                </div>
                { (links && links.length > 0) ? (
                    <div className="ui one column grid">
                        <div className="center aligned row">
                            <div className="column">
                                <div className="ui inverted segment">
                                    <Player
                                        tracks={links}
                                        currentTrack={playerState.currentTrack}
                                        onPlayerReady={this._assignPlayer}
                                        onPlayerStateChange={this._onPlayerStateChange}
                                        onTrackChange={this._onTrackChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="ui basic segment">
                                    <TrackList
                                        tracks={links}
                                        currentTrack={playerState.currentTrack}
                                        playerState={playerState.state}
                                        onTrackClicked={this._onTrackClicked}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="ui basic segment">
                        <div className={`ui message${isFetching ? ' loading' : ''}`}>
                            <h1 className="ui header">Music discovery, powered by Reddit</h1>
                            <p>Simply enter one or more musical subreddit names and Flock will return a playlist of what's hot for your listening pleasure</p>
                            <p>Here's a few suggestions to get you going:</p>
                            <Link to="/chillmusic">ChillMusic</Link> • <Link to="/blues+rock">Blues & Rock</Link> • <Link to="90shiphop">90s HipHop</Link> • <Link to="/futuregarage+futurebeats">FutureGarage & FutureBeats</Link>
                        </div>
                    </div>
                )}
                <div className="ui basic footer segment">
                    <div className="ui right aligned container">
                        <h2 className="ui header">
                            <a href="https://twitter.com/rblstr">@rblstr</a> | <a href="https://github.com/rblstr/flock-react" target="_blank">github.com/rblstr/flock-react</a>
                            <div className="sub header">
                                <a href="http://flock.rblstr.com">original version</a> by <a href="https://twitter.com/rblstr" target="_blank">@rblstr</a> & <a href="https://twitter.com/rokeeffe" target="_blank">@rokeeffe</a>
                            </div>
                        </h2>
                    </div>
                </div>
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