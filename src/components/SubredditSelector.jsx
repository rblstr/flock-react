import React from 'react'

export default ({ subreddits, updateSubreddits, fetchTracks }) => {
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
