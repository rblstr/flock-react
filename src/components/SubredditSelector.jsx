import React from 'react'

const SubredditSelector = ({ subreddits, updateSubreddits, fetchTracks }) => {
    return (
        <form onSubmit={e => {
                e.preventDefault()
                fetchTracks(subreddits)
            }}
        >
            <input
                type="text"
                placeholder="subreddits subreddits subreddits ..."
                value={subreddits.join(' ')}
                onChange={e => updateSubreddits(e.target.value)}
            />
            <input type="submit" value="Play"/>
        </form>
    )
}

export default SubredditSelector