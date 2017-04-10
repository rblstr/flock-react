import React, { Component } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

import { trackToVideoId } from '../Track'

import { arrayEquals } from '../utils'

export const PlayerState = Object.freeze({
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
})

class YouTubePlayerComponent extends Component {
    constructor(props) {
        super(props)

        this._refPlayerElement = ref => this._playerElement = ref
    }

    componentDidMount () {
        const {
            onPlayerStateChange,
            onTrackChange,
            tracks
        } = this.props

        const [ first, ...playlist ] = tracks.map(trackToVideoId)

        this.player = YouTubePlayer(
            this._playerElement,
            first,
            { playerVars: { playlist } }
        )

        this.player.on('stateChange', event => {
            onPlayerStateChange(event.data)

            this.player.getVideoUrl()
                .then(url => {
                    const { tracks, currentTrack } = this.props
                    const videoId = URI(url).query(true).v
                    const track = tracks.find(track => videoId === URI(track.url).query(true).v)
                    if (currentTrack !== track) {
                        onTrackChange(track)
                    }
                })
        })
    }

    componentWillReceiveProps (nextProps) {
        const { tracks: currentTracks, currentTrack } = this.props
        const { tracks: nextTracks, currentTrack: nextCurrentTrack } = nextProps

        if (!arrayEquals(currentTracks, nextTracks)) {
            this.player.cuePlaylist(nextTracks.map(trackToVideoId))
        }

        if (currentTrack !== nextCurrentTrack) {
            this.player.playVideoAt(nextTracks.findIndex(track => track === nextCurrentTrack))
        }
    }

    shouldComponentUpdate () {
        return false
    }

    render () {
        return <div ref={this._refPlayerElement} />
    }
}

export default YouTubePlayerComponent
