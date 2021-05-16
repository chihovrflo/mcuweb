import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import App from '../App';
import MCU from '../components/MCU';

export default function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/mcu/:name" component={MCU} />
        <Route exact path="/add/mcu" component={() => <div>add mcu</div>} />
      </Switch>
    </Router>
  )
}