import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Second from './Second';
import Third from './Third';

const Fifth = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/planning">Go to Planning</Link>
            </li>
            <li>
              <Link to="/hitpicking">Go to Hitpicking</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/planning" component={Second} />
          <Route path="/hitpicking" component={Third} />
        </Switch>
      </div>
    </Router>
  );
};

export default Fifth;
