import React from 'react'

const upvoteStyle = {
    color: 'orangered'
}

const downvoteStyle = {
    color: '#9494FF'
}

export default ({ track }) => {
    return (
        <div>
            <span>{track.title}</span>
            <div>
                <a href={track.permalink}>Permalink</a>&nbsp;
                <a href={track.url}>YouTube</a>&nbsp;
                <span style={upvoteStyle}>{track.ups}</span>:<span style={downvoteStyle}>{track.downs}</span>
            </div>
        </div>
    )
}