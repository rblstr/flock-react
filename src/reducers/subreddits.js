import {
    SUBREDDITS_UPDATE
} from '../actions/subreddits'

export default (state=[], action) => {
    switch (action.type) {
        case SUBREDDITS_UPDATE:
            return [...action.subreddits]
        default:
            return state
    }
}
