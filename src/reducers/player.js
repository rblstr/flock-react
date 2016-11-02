import {
    PLAYER_SET_TRACK,
    PLAYER_PLAYING,
    PLAYER_PAUSED
} from '../actions/player'

import {
    LINKS_RECIEVED
} from '../actions/links'

const initialState = {
    isPlaying: false,
    currentTrack: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case PLAYER_SET_TRACK:
            return {
                ...state,
                currentTrack: action.track
            }
        case PLAYER_PLAYING:
            return {
                ...state,
                isPlaying: true
            }
        case PLAYER_PAUSED:
            return {
                ...state,
                isPlaying: false
            }
        case LINKS_RECIEVED:
            return {
                ...state,
                currentTrack: action.links[0].id
            }
        default:
            return state
    }
}