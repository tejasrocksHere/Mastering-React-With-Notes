// Router.js
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ScreenRecord from './ScreenRecording';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ScreenRecord} />
      <Route path="/screenrecording" component={ScreenRecord} />
    </Switch>
  </BrowserRouter>
);

export default Router;
