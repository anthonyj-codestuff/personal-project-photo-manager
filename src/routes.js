import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Pages/Home';
import Pic from './components/Pages/Pic';
import Upload from './components/Pages/Upload';
import Dashboard from './components/Pages/Dashboard';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/upload" component={Upload}/>
    <Route path="/pic/:pid" component={Pic}/>
    <Route path="/dashboard" component={Dashboard}/>
  </Switch>
);