import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
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
      </Switch>
    </Router>
  );
}
