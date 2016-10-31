import { TRACK_PLAY } from '../actions/tracks'

const initialState = {
    currentTrack: -1
}

export default (state=initialState, action) => {
    switch(action.type) {
        case TRACK_PLAY:
            return {
                ...state,
                currentTrack: action.track
            }
        default:
            return state
    }
}
