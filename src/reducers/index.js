import { combineReducers } from 'redux'

import subreddits from './subreddits'
import links from './links'
import tracks from './tracks'

export default combineReducers({
    subreddits,
    links,
    tracks
})
