import {
    PlayerState,
    PLAYER_SET_STATE,
    PLAYER_SET_CURRENT_TRACK
} from '../actions/player'

const initialState = {
    state: PlayerState.UNSTARTED,
    currentTrack: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case PLAYER_SET_STATE:
            return {
                ...state,
                state: action.state
            }
        case PLAYER_SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.track
            }
        default:
            return state
    }
}