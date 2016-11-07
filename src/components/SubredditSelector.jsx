import React, { Component } from 'react'

class SubredditSelector extends Component {
    render () {
        const { subreddits, updateSubreddits, fetchTracks } = this.props
        return (
            <form onSubmit={e => {
                    e.preventDefault()
                    fetchTracks(this.subredditField.value)
                }}
            >
                <input
                    type="text"
                    placeholder="subreddits subreddits subreddits ..."
                    defaultValue={subreddits.join(' ')}
                    ref={ref => this.subredditField = ref}
                />
                <input type="submit" value="Play"/>
            </form>
        )
    }
}

export default SubredditSelector