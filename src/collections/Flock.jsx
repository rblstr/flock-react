import React from 'react'
import { connect } from 'react-redux'

import { updateSubreddits } from '../actions/subreddits'
import { fetchLinks } from '../actions/links'
import { playTrack, setTrack, playing, paused } from '../actions/player'

import SubredditSelector from '../components/SubredditSelector.jsx'
import Player, { PlayerState } from '../components/Player.jsx'
import TrackList from '../components/TrackList.jsx'

const Flock = ({ dispatch, subreddits, isFetching, links, error, currentTrack, isPlaying }) => {
    return (
        <div>
            <h1>Flock</h1>
            <SubredditSelector
                subreddits={subreddits}
                updateSubreddits={subreddits => dispatch(updateSubreddits(subreddits))}
                fetchTracks={subreddits => dispatch(fetchLinks(subreddits))}
            />
            { links && links.length > 1 &&
                <Player
                    tracks={links}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    onPlayerStateChange={state => {
                        switch (state) {
                            case PlayerState.UNSTARTED:
                                console.log(state)
                                break
                            case PlayerState.ENDED:
                                console.log(state)
                                break
                            case PlayerState.PLAYING:
                                dispatch(playing())
                                break
                            case PlayerState.PAUSED:
                                dispatch(paused())
                                break
                            case PlayerState.BUFFERING:
                                console.log(state)
                                break
                            case PlayerState.QUEUED:
                                console.log(state)
                                break
                            default:
                                break
                        }
                    }}
                />
            }
            { !error ?
                <TrackList
                    isFetching={isFetching}
                    tracks={links}
                    onTrackClicked={track => {
                        if (track.id === currentTrack) {
                            if (isPlaying) {
                                dispatch(paused())
                            } else {
                                dispatch(playing())
                            }
                        } else {
                            dispatch(playTrack(track))
                        }
                    }}
                    currentTrack={currentTrack}
                />
                : <div style={{color: 'red'}}>
                    {error}
                </div>
            }
                
        </div>
    )
}

const mapStateToProps = ({ subreddits, links, player }) => {
    return {
        subreddits,
        isFetching: links.isFetching,
        links: links.links,
        error: links.error,
        currentTrack: player.currentTrack,
        isPlaying: player.isPlaying
    }
}

export default connect(mapStateToProps)(Flock)
