import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Flock from './collections/Flock.jsx'

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/:subreddits" component={Flock} />
            <Route path="/" component={Flock} />
        </Switch>
    </Router>,
    document.getElementById('flock')
)
