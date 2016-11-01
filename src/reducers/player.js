import {
    PLAYER_SET_TRACK,
    PLAYER_PLAYING,
    PLAYER_PAUSED
} from '../actions/player'

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
        default:
            return state
    }
}