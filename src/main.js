import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, hashHistory } from 'react-router'

import reducer from './reducers'

import Flock from './collections/Flock.jsx'

const logger = createLogger() 

const store = createStore(
    reducer,
    applyMiddleware(
        Thunk,
        logger
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Flock} />
            <Route path="/:subreddits" component={Flock} />
        </Router>
    </Provider>,
    document.getElementById('flock')
)
