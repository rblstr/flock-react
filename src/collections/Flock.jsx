import React from 'react'
import { connect } from 'react-redux'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { playTrack } from '../actions/tracks'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

const Flock = ({ dispatch, subreddits, isFetching, links, error, currentTrack }) => {
    return (
        <div>
            <h1>Flock</h1>
            <SubredditSelector
                subreddits={subreddits}
                updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                fetchTracks={subreddits => dispatch(fetchLinks(subreddits))}
            />
            { links && links.length > 1 &&
                <Player tracks={links} currentTrack={currentTrack} />
            }
            { !error ?
                <TrackList
                    isFetching={isFetching}
                    tracks={links}
                    onPlayTrack={track => dispatch(playTrack(track))}
                    currentTrack={currentTrack}
                />
                : <div style={{color: 'red'}}>
                    {error}
                </div>
            }
                
        </div>
    )
}

const mapStateToProps = ({ subreddits, links, tracks }) => {
    return {
        subreddits,
        isFetching: links.isFetching,
        links: links.links,
        error: links.error,
        currentTrack: tracks.currentTrack
    }
}

export default connect(mapStateToProps)(Flock)
