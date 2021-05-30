import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  MCUCreator,
  MCUDetail,
  MCUList,
} from 'pages/MCU';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/mcu/list" />} />
        <Route exact path="/mcu/list" component={MCUList} />
        <Route exact path="/mcu/host/:host/port/:port" component={MCUDetail} />
        <Route exact path="/mcu/add" component={MCUCreator} />
      </Switch>
    </Router>
  );
}
