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
        iconClassName = `${iconClassName} middle aligned link icon`

        return (
            <div
                className="item"
                onMouseEnter={e => this.setState({isHovering: true})}
                onMouseLeave={e => this.setState({isHovering: false})}
            >
                <div className="right floated content">
                    <a href={track.url} target="_black"><i className="film icon"></i>YouTube</a>
                </div>
                <i
                    className={iconClassName}
                    style={{paddingLeft: 0, paddingRight: 0}}
                    onClick={e => onTrackClicked(track)}>
                </i>
                <div className="content">
                    <span
                        style={{cursor: 'pointer', color: playing ? '#FBBD08' : 'black'}}
                        onClick={e => onTrackClicked(track)}
                    >{track.title}</span>
                    <a href={track.permalink} target="_black">&nbsp;<i className="comment icon"></i>{track.num_comments}</a>
                </div>
            </div>
        )
    }
}

export default Track