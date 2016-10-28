import React from 'react'

export default ({ subreddits, updateSubreddits, fetchTracks }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="subreddits subreddits subreddits ..."
                value={subreddits.join(' ')}
                onChange={ e => updateSubreddits(e.target.value) }
            />
            <button
                onClick={ e => fetchTracks(subreddits) }
            >
                Play
            </button>
        </div>
    )
}
