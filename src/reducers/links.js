import {
    LINKS_FETCHING,
    LINKS_RECIEVED,
    LINKS_ERROR
} from '../actions/links'

const initialState = {
    isFetching: false,
    links: [],
    error: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case LINKS_FETCHING:
            return {
                ...state,
                links: [],
                isFetching: true,
                error: null
            }
        case LINKS_RECIEVED:
            return {
                ...state,
                links: action.links,
                isFetching: false,
                error: null
            }
        case LINKS_ERROR:
            return {
                ...state,
                links: [],
                isFetching: false,
                error: 'Error fetching links'
            }
        default:
            return state
    }
}
