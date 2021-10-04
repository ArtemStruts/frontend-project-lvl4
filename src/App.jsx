import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import Login from './Login.jsx';

const App = () => (
  <Router>
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

const Home = () => (<h3>Matched!</h3>);

const NoMatch = () => (<h3>404 (not found)</h3>);

export default App;
