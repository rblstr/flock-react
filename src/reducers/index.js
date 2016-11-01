import { combineReducers } from 'redux'

import subreddits from './subreddits'
import links from './links'
import player from './player'

export default combineReducers({
    subreddits,
    links,
    player
})
