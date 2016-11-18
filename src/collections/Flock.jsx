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

        this.state = {
            sort: 'hot',
            t: 'all'
        }

        this._assignPlayer = player => this.player = player
        this._onFetchTracks = subreddits => this.onFetchTracks(subreddits)
        this._onPlayerStateChange = state => dispatch(setPlayerState(state))
        this._onTrackChange = track => dispatch(setPlayerCurrentTrack(track))
        this._onTrackClicked = track => this.onTrackClicked(track)
        this._onSortChanged = (sort, t='all') => this.onSortChanged(sort, t)
    }

    componentWillMount () {
        let {
            dispatch,
            params: {
                subreddits = '',
                sort = 'hot',
                t = 'all'
            }
        } = this.props

        this.setState({sort, t})

        const splitSubreddits = subreddits.split('+').filter(subreddit => subreddit)

        if (splitSubreddits && splitSubreddits.length) {
            dispatch(updateSubreddits(splitSubreddits))
            dispatch(fetchLinks(splitSubreddits, sort, t))
        }
    }

    componentWillReceiveProps (nextProps) {
        const {
            dispatch,
            subreddits,
            params: {
                subreddits: paramsSubreddits = '',
                sort = 'hot',
                t = 'all'
            },
            playerState: {
                currentTrack
            }
        } = nextProps

        if (currentTrack) {
            document.title = `Flock | ${currentTrack.title}`
        } else {
            document.title = 'Flock | subreddit playlister'
        }

        const {
            sort: stateSort,
            t: stateT
        } = this.state

        const splitParamsSubreddits = paramsSubreddits.split('+').filter(subreddit => subreddit)
        const sortedParamsSubreddits = splitParamsSubreddits.concat().sort()
        const sortedSubreddits = subreddits.concat().sort()

        const sortChanged = ((stateSort !== sort) || (stateT !== t))
        const subredditsChanged = !arrayEquals(sortedParamsSubreddits, sortedSubreddits)

        if (sortChanged || subredditsChanged) {
            this.setState({sort, t})
            dispatch(updateSubreddits(splitParamsSubreddits))
            dispatch(fetchLinks(splitParamsSubreddits, sort, t))
        }
    }

    onFetchTracks (subreddits) {
        const { sort, t } = this.state
        const { dispatch, subreddits: stateSubreddits } = this.props

        const sortedSubreddits = subreddits.concat().sort()
        const sortedStateSubreddits = stateSubreddits.concat().sort()
        if (!arrayEquals(sortedSubreddits, sortedStateSubreddits)) {
            hashHistory.push(`${subreddits.join('+')}`)
        }
    }

    onTrackClicked (track) {
        const {
            dispatch,
            playerState: {
                currentTrack,
                state
            }
        } = this.props

        if (track !== currentTrack) {
            this.player.playTrack(track)
        } else {
            if (state === PlayerState.PLAYING) {
                this.player.pause()
            } else if (state === PlayerState.PAUSED) {
                this.player.play()
            }
        }
    }

    onSortChanged (sort, t) {
        const { subreddits } = this.props
        const { sort: stateSort, t: stateT } = this.state

        if (stateSort !== sort || stateT !== t) {
            hashHistory.push(`${subreddits.join('+')}/${sort}/${t}`)
        }
    }

    render () {
        const {
            isFetching,
            links,
            error,
            playerState,
            subreddits
        } = this.props

        const { sort, t } = this.state

        return (
            <div className="ui text container">
                <div className="ui masthead basic segment">
                    <Link to="/">
                        <h1 className="ui yellow header">Flock</h1>
                    </Link>
                    <SubredditSelector
                        subreddits={subreddits}
                        isFetching={isFetching}
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
                        <div className="row">
                            <div className="column">
                                <button
                                    className={`ui ${sort === 'hot' ? 'primary ' : ''}button`}
                                    onClick={event => this._onSortChanged('hot')}
                                >
                                    Hot
                                </button>
                                <select
                                    value={sort === 'top' ? t : ''}
                                    onChange={event => this._onSortChanged('top', event.target.value)}
                                >
                                    <option value="">Top</option>
                                    <option value="all">All</option>
                                    <option value="year">Year</option>
                                    <option value="month">Month</option>
                                    <option value="week">Week</option>
                                    <option value="day">Day</option>
                                </select>
                            </div>
                        </div>
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
                ) : ( !isFetching &&
                    <div className="ui basic segment">
                        <div className="ui message">
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
    const playerState = {...player}
    playerState.currentTrack = links.links.find(track => track.id === playerState.currentTrack)

    return {
        subreddits,
        isFetching: links.isFetching,
        links: links.links,
        error: links.error,
        playerState
    }
}

export default connect(mapStateToProps)(Flock)