import {
    PLAYER_LOAD,
    PLAYER_LOADED
} from '../actions/player'

const initialState = {
    isLoading: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case PLAYER_LOAD:
            return {
                ...state,
                isLoading: true
            }
        case PLAYER_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}