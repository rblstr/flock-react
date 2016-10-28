import React, { Component } from 'react'
import YouTubePlayer from 'youtube-player'
import URI from 'urijs'

class Player extends Component {

    constructor (props) {
        super(props)

        this._assignPlayerElement = ref => this.assignPlayerElement(ref)
    }

    componentDidMount () {
        const { tracks } = this.props

        const [ videoId, ...playlist ] = tracks
            .map(track => URI(track.url).query(true).v)

        let player = YouTubePlayer(this.playerElement, {
            videoId,
            playerVars: {
                playlist: playlist.join(',')
            }
        })
    }

    assignPlayerElement (playerElement) {
        console.log(this, playerElement)
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
