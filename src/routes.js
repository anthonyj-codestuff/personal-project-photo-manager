import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadPictureButton from './components/uploadPictureButton';

export default (
  <Switch>
    <Route exact path="/" component={UploadPictureButton}/>
    {/* <Route/> */}
  </Switch>
);