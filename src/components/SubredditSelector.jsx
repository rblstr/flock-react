import React, { Component } from 'react'

class SubredditSelector extends Component {

    constructor (props) {
        super(props)

        const { fetchTracks } = this.props

        this._assignSubredditField = ref => this.subredditField = ref
        this._onSubmit = event => {
            event.preventDefault()
            const subreddits = this.subredditField.value
                .trim().split(' ').filter(subreddit => subreddit)
            fetchTracks(subreddits)
        }
    }

    render () {
        const { subreddits } = this.props
        return (
            <form onSubmit={this._onSubmit}
            >
                <input
                    type="text"
                    placeholder="subreddits subreddits subreddits ..."
                    defaultValue={subreddits.join(' ')}
                    ref={this._assignSubredditField}
                />
                <input type="submit" value="Play"/>
            </form>
        )
    }
}

export default SubredditSelector