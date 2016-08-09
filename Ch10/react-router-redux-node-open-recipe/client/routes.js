import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Repos from './components/Repos';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About} />  
      <Route path='/repos' component={Repos} />  
    </Route>
  </Router>
);