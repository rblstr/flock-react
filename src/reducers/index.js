import { combineReducers } from 'redux'

import subreddits from './subreddits'
import links from './links'

export default combineReducers({
    subreddits,
    links
})
