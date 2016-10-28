import React from 'react'
import { connect } from 'react-redux'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

const Flock = ({ dispatch, subreddits, isFetching, links, error }) => {
    return (
        <div>
            <h1>Flock</h1>
            <SubredditSelector
                subreddits={subreddits}
                updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                fetchTracks={subreddits => dispatch(fetchLinks(subreddits))}
            />
            { links && links.length > 1 &&
                <Player tracks={links} />
            }
            { !error ?
                <TrackList isFetching={isFetching} tracks={links} />
                : <div style={{color: 'red'}}>
                    {error}
                </div>
            }
                
        </div>
    )
}

const mapStateToProps = ({ subreddits, links }) => {
    return {
        subreddits,
        isFetching: links.isFetching,
        links: links.links,
        error: links.error
    }
}

export default connect(mapStateToProps)(Flock)
