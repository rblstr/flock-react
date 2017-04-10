import React, { Component } from 'react'

import TrackList from '../components/TrackList.jsx'
import YouTubePlayerComponent from '../components/YouTubePlayerComponent.jsx'

import Track, { processTracks } from '../Track'

import { REDDIT_LIMIT } from '../constants'
import { arrayEquals } from '../utils'

class Flock extends Component {
    constructor(props) {
        super(props)

        this._refSubredditInput = ref => this._subredditInput = ref

        this._onPlayerStateChange = playerState => this.setState({ playerState })
        this._onTrackChange = currentTrack => this.setState({ currentTrack })

        this._onPlay = () => {
            const subreddits = this._subredditInput.value.split(' ')
            this.setState({
                isFetching: true,
                subreddits: subreddits,
                tracks: [],
                currentTrack: undefined
            })

            // setTimeout(
            //     () => {
            //         processTracks(EXAMPLE_TRACKS)
            //             .then(tracks => {
            //                 const [ currentTrack ] = tracks
            //                 this.setState({
            //                     isFetching: false,
            //                     tracks,
            //                     currentTrack
            //                 })
            //             })
            //     },
            //     0
            // )

            const subredditsUrl = subreddits.filter(s => s).join('+')

            fetch(`https://www.reddit.com/r/${subredditsUrl}.json?limit=${REDDIT_LIMIT}`)
                .then(response => response.json())
                .then(json => processTracks(json.data.children.map(child => Track(child.data))))
                .then(tracks => {
                    const [ currentTrack ] = tracks

                    this.setState({
                        isFetching: false,
                        tracks,
                        currentTrack
                    })
                })
                .catch(error => {
                    console.error(error) // eslint-disable-line no-console
                    this.setState({ isFetching: false })
                })
        }

        this._onSubredditInputChange = event => {
            this.setState({ subreddits: event.target.value.split(' ') })
        }

        this.state = {
            isFetching: false,
            subreddits: [],
            tracks: [],
            currentTrack: undefined,
            playerState: undefined
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        const {
            isFetching,
            subreddits,
            playerState,
            currentTrack
        } = this.state

        const {
            isFetching: nextIsFecthing,
            subreddits: nextSubreddits,
            playerState: nextPlayerState,
            currentTrack: nextCurrentTrack
        } = nextState

        return (
            isFetching !== nextIsFecthing ||
            !arrayEquals(subreddits, nextSubreddits) ||
            playerState !== nextPlayerState ||
            currentTrack !== nextCurrentTrack
        )
    }

    render () {
        const {
            isFetching,
            subreddits,
            tracks,
            currentTrack,
            playerState
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
                    <button
                        onClick={this._onPlay}
                        disabled={isFetching}
                    >
                        {isFetching ? 'loading' : 'play'}
                    </button>
                </div>
                <div style={{ display: !tracks.length ? 'none' : undefined }}>
                    <YouTubePlayerComponent
                        currentTrack={currentTrack}
                        onPlayerStateChange={this._onPlayerStateChange}
                        tracks={tracks}
                        onTrackChange={this._onTrackChange}
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
