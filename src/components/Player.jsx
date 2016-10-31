import React, { PureComponent } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

class Player extends PureComponent {

    constructor (props) {
        super(props)

        this._assignPlayerElement = ref => this.assignPlayerElement(ref)
    }

    componentDidMount () {
        const { tracks } = this.props

        const [ videoId, ...playlist ] = tracks
            .map(track => URI(track.url).query(true).v)

        this.player = YouTubePlayer(this.playerElement, {
            videoId,
            playerVars: {
                playlist: playlist.join(',')
            }
        })
    }

    assignPlayerElement (playerElement) {
        this.playerElement = playerElement
    }

    componentWillReceiveProps ({ currentTrack, tracks }) {
        const ids = tracks
            .map(track => track.id)
        if (currentTrack !== this.currentTrack) {
            this.player.playVideoAt(ids.indexOf(currentTrack))
            this.currentTrack = currentTrack
        }
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
