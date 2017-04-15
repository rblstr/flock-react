import React, { Component } from 'react'
import URI from 'urijs'

import TrackList from '../components/TrackList.jsx'
import YouTubePlayerComponent from '../components/YouTubePlayerComponent.jsx'

import Track, { processTracks } from '../Track'

import { REDDIT_LIMIT } from '../constants'
import { arrayEquals } from '../utils'

const compareById = (lhs, rhs) => lhs.id === rhs.id

class Flock extends Component {
    constructor(props) {
        super(props)

        this._refSubredditInput = ref => this._subredditInput = ref

        this._onPlayerStateChange = playerState => this.setState({ playerState })
        this._onTrackChange = currentTrack => this.setState({ currentTrack })

        this._onPlaylistLoaded = playlist => {
            const { tracks } = this.state
            this.setState({
                tracks: tracks.filter(track => playlist.includes(URI(track.url).query(true).v))
            })
        }

        this._onPlay = () => {

            const { history } = this.props

            const subreddits = this._subredditInput.value.split(' ')

            if (subreddits.length === 0) {
                return
            }

            history.push(subreddits.join('+'))
        }

        this._onSubredditInputChange = event => {
            this.setState({ subreddits: event.target.value.split(' ') })
        }

        this._fetchSubreddits = subreddits => {
            this.setState({
                isFetching: true,
                subreddits: subreddits,
                tracks: [],
                currentTrack: undefined,
                error: undefined
            })

            const subredditsUrl = subreddits.filter(s => s).join('+')

            fetch(`https://www.reddit.com/r/${subredditsUrl}.json?limit=${REDDIT_LIMIT}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error response from Reddit')
                    }
                })
                .then(json => {
                    if (!json.error) {
                        return processTracks(json.data.children.map(child => Track(child.data)))
                    } else {
                        throw new Error('Error response from Reddit')
                    }
                })
                .then(tracks => {
                    const [ currentTrack ] = tracks

                    this.setState({
                        isFetching: false,
                        tracks,
                        currentTrack
                    })
                })
                .catch(error => {
                    /* eslint-disable no-console */
                    console.error(error.message)
                    /* eslint-enable no-console */
                    this.setState({
                        isFetching: false,
                        tracks: [],
                        currentTrack: undefined,
                        error: error.message
                    })
                })
        }

        this.state = {
            isFetching: false,
            subreddits: [],
            tracks: [],
            currentTrack: undefined,
            playerState: undefined
        }
    }

    componentDidMount () {
        const { subreddits } = this.props.match.params

        this._fetchSubreddits(subreddits.split('+'))
    }

    componentWillReceiveProps (nextProps) {
        const { subreddits } = this.props.match.params
        const { subreddits: nextSubreddits } = nextProps.match.params

        if (!arrayEquals(subreddits.split('+'), nextSubreddits.split('+'))) {
            this._fetchSubreddits(nextSubreddits.split('+'))
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        const {
            isFetching,
            subreddits,
            playerState,
            currentTrack,
            tracks,
            error
        } = this.state

        const {
            isFetching: nextIsFecthing,
            subreddits: nextSubreddits,
            playerState: nextPlayerState,
            currentTrack: nextCurrentTrack,
            tracks: nextTracks,
            error: nextError
        } = nextState

        return (
            isFetching !== nextIsFecthing ||
            !arrayEquals(subreddits, nextSubreddits) ||
            playerState !== nextPlayerState ||
            currentTrack !== nextCurrentTrack ||
            !arrayEquals(tracks, nextTracks, compareById) ||
            error !== nextError
        )
    }

    render () {
        const {
            isFetching,
            subreddits,
            tracks,
            currentTrack,
            playerState,
            error
        } = this.state

        return (
            <div>
                <div>
                    <h1 style={{ color: '#FD0005' }}>flock</h1>
                    <input
                        ref={this._refSubredditInput}
                        type="text"
                        placeholder="enter space seperated subeddit names"
                        value={subreddits.join(' ')}
                        onChange={this._onSubredditInputChange}
                        disabled={isFetching}
                    />
                    { error && <span style={{ color: '#FF0000' }}>{error}</span> }
                    <button
                        onClick={this._onPlay}
                        disabled={isFetching || subreddits.length === 0}
                    >
                        {isFetching ? 'loading' : 'play'}
                    </button>
                </div>
                <div style={{ display: !tracks.length ? 'none' : undefined }}>
                    <YouTubePlayerComponent
                        currentTrack={currentTrack}
                        tracks={tracks}
                        onPlayerStateChange={this._onPlayerStateChange}
                        onTrackChange={this._onTrackChange}
                        onPlaylistLoaded={this._onPlaylistLoaded}
                    />
                </div>
                { tracks && tracks.length > 0 &&
                    <TrackList
                        tracks={tracks}
                        currentTrack={currentTrack}
                        playerState={playerState}
                        onPlayTrack={this._onTrackChange}
                    />
                }
            </div>
        )
    }
}

export default Flock
