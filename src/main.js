import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import createLogger from 'redux-logger'

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
        <Flock />
    </Provider>,
    document.getElementById('flock')
)
