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

    componentDidUpdate() {
        this.subredditField.value = this.props.subreddits.join(' ')
    }

    render () {
        const { subreddits } = this.props
        return (
            <form onSubmit={this._onSubmit}>
                <div className="ui fluid action input">
                    <input
                        type="text"
                        placeholder="subreddit subreddit subreddit ..."
                        defaultValue={subreddits.join(' ')}
                        ref={this._assignSubredditField}
                    />
                    <button className="ui yellow right labeled icon button">
                        <i className="play icon"></i>
                        Play
                    </button>
                </div>
            </form>
        )
    }
}

export default SubredditSelector