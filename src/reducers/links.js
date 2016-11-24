import {
    LINKS_FETCHING,
    LINKS_REFRESHING,
    LINKS_RECIEVED,
    LINKS_ERROR
} from '../actions/links'

const initialState = {
    isFetching: false,
    isRefreshing: false,
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
                isRefreshing: false,
                error: null
            }
        case LINKS_REFRESHING:
            return {
                ...state,
                links: [],
                isFetching: false,
                isRefreshing: true,
                error: null
            }
        case LINKS_RECIEVED:
            return {
                ...state,
                links: action.links,
                isFetching: false,
                isRefreshing: false,
                error: null
            }
        case LINKS_ERROR:
            return {
                ...state,
                links: [],
                isFetching: false,
                isRefreshing: false,
                error: 'Error fetching links'
            }
        default:
            return state
    }
}
