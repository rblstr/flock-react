import React, { PureComponent } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

import { PlayerState } from '../actions/player'

class Player extends PureComponent {

    constructor (props) {
        super(props)

        this.state = {
            currentTrack: null,
            state: PlayerState.UNSTARTED
        }
        
        this._assignPlayerElement = player => this.playerElement = player
    }

    playTrack (newTrack) {
        const { tracks } = this.props
        const index = tracks.findIndex(track => track.id === newTrack.id)
        return this.player.playVideoAt(index)
    }

    play () {
        return this.player.playVideo()
    }

    pause () {
        return this.player.pauseVideo()
    }

    componentDidMount () {
        const {
            tracks,
            onPlayerReady,
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
                if (track.id !== this.state.currentTrack) {
                    onTrackChange(track)
                    this.setState({currentTrack: track.id})
                }
            })
            this.setState({state: state})
            onPlayerStateChange(state)
        })

        this.player.on('ready', event => {
            onPlayerReady(this)
        })

        this.player.on('error', event => {
            console.error(event)
        })
    }

    render () {
        return <div ref={this._assignPlayerElement} />
    }
}

export default Player