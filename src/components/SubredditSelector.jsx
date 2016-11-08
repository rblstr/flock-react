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
        const { subreddits, isFetching } = this.props
        const iconClassName = isFetching ? 'notched circle loading' : 'play'
        return (
            <form onSubmit={this._onSubmit}
            >
                <div className="ui fluid icon input">
                    <input
                        type="text"
                        placeholder="subreddit subreddit subreddit ..."
                        defaultValue={subreddits.join(' ')}
                        ref={this._assignSubredditField}
                    />
                    <i className={`${iconClassName} icon`}></i>
                </div>
            </form>
        )
    }
}

export default SubredditSelector