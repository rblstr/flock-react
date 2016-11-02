import React, { PureComponent } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

export const PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    QUEUED: 4
}

class Player extends PureComponent {

    constructor (props) {
        super(props)

        this._assignPlayerElement = ref => this.assignPlayerElement(ref)
    }

    componentDidMount () {
        const { tracks, onPlayerStateChange } = this.props

        const [ videoId, ...playlist ] = tracks
            .map(track => URI(track.url).query(true).v)

        this.player = YouTubePlayer(this.playerElement, {
            videoId,
            playerVars: {
                playlist: playlist.join(',')
            }
        })

        this.currentTrack = tracks[0].id

        this.player.on('stateChange', e => onPlayerStateChange(e.data))
    }

    assignPlayerElement (playerElement) {
        this.playerElement = playerElement
    }

    componentWillReceiveProps ({ currentTrack, tracks, isPlaying }) {
        const ids = tracks
            .map(track => track.id)
        if (currentTrack !== this.currentTrack) {
            this.player.playVideoAt(ids.indexOf(currentTrack))
            this.currentTrack = currentTrack
        }
        this.player.getPlayerState()
            .then(state => {
                const playerIsPlaying = (state === PlayerState.PLAYING)
                if (isPlaying !== playerIsPlaying) {
                    if (isPlaying) {
                        this.player.playVideo()
                    } else {
                        this.player.pauseVideo()
                    }
                }
            })
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
