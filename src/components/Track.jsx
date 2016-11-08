import React, { Component } from 'react'

import { PlayerState } from '../actions/player'

const upvoteStyle = {
    color: 'darkgoldenrod'
}

const downvoteStyle = {
    color: '#9494FF'
}

const subredditStyle = {
    color: '#666666',
    fontStyle: 'italic'
}

class Track extends Component {

    constructor (props) {
        super(props)

        this.state = { isHovering: false }
    }

    render () {
        const { track, playing, playerState, onTrackClicked } = this.props
        const { isHovering } = this.state

        let iconClassName
        if (!playing) {
            if (isHovering) {
                iconClassName = 'play'
            } else {
                iconClassName = 'disabled play'
            }
        } else {
            if (isHovering) {
                if (playerState === PlayerState.PLAYING) {
                    iconClassName = 'pause'
                } else if (playerState === PlayerState.PAUSED) {
                    iconClassName = 'play'
                } else {
                    iconClassName = 'notched circle loading'
                }
            } else {
                iconClassName = 'volume up'
            }
        }
        iconClassName = `large ${iconClassName} middle aligned icon`

        return (
            <div
                className="item"
                onMouseEnter={e => this.setState({isHovering: true})}
                onMouseLeave={e => this.setState({isHovering: false})}
            >
                <i className={iconClassName} style={{cursor: 'pointer'}} onClick={e => onTrackClicked(track)}></i>
                <div className="content">
                    <h3 className={`ui ${playing ? 'yellow ' : ''}header`} style={{cursor: 'pointer'}} onClick={e => onTrackClicked(track)}>{track.title}</h3>
                    <div className="description">
                        <a href={track.permalink} target="_blank">Permalink</a>&nbsp;
                        <a href={track.url} target="_blank">YouTube</a>&nbsp;
                        <span style={upvoteStyle}>{track.ups}</span>:<span style={downvoteStyle}>{track.downs}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Track