import React, { PureComponent } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

import { PlayerState } from '../actions/player'

class Player extends PureComponent {

    constructor (props) {
        super(props)

        this.state = { currentTrack: null, state: PlayerState.UNSTARTED }
        this._assignPlayerElement = ref => this.assignPlayerElement(ref)
    }

    componentDidMount () {
        const {
            tracks,
            onPlayerStateChange,
            onTrackChange
        } = this.props

        const trackToVideoId = track => new URI(track.url).query(true).v
        const videoIdToTrack = id => track => new URI(track.url).query(true).v === id

        const [ videoId, ...playlist ] = tracks
            .map(trackToVideoId)
            .map(id => id.substring(0, 11)) // Because https://www.youtube.com/watch?v=zhgwRBb48VI?new

        this.player = YouTubePlayer(this.playerElement, {
            videoId,
            playerVars: {
                playlist: playlist.join(',')
            }
        })

        this.player.on('stateChange', event => {
            const { data: state } = event
            this.player.getVideoUrl().then(url => {
                const videoId = new URI(url).query(true).v
                const track = tracks.find(videoIdToTrack(videoId))
                if (track.id != this.state.currentTrack) {
                    onTrackChange(track)
                    this.setState({currentTrack: track.id})
                }
            })
            this.setState({state: state})
            onPlayerStateChange(state)
        })

        this.player.on('error', event => {
            console.error(event)
        })
    }

    componentWillReceiveProps ({ currentTrack, tracks }) {
        if (this.state.currentTrack !== currentTrack) {
            this.player.playVideoAt(tracks.findIndex(track => track.id === currentTrack))
            this.setState({currentTrack: currentTrack})
        }
    }

    assignPlayerElement (playerElement) {
        this.playerElement = playerElement
    }

    render () {
        const { tracks } = this.props
        return (
            <div>
                <div ref={this._assignPlayerElement} />
            </div>
        )
    }
}

export default Player
