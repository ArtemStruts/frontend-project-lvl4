import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import Login from './Login.jsx';
import AppNavbar from './Navbar.jsx';

const useProvideAuth = () => {
  const usernameToken = localStorage.getItem('token');
  const [userToken, setUserToken] = useState(usernameToken);

  const signIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUserToken(token);
  };
  return {
    userToken,
    signIn,
  };
};

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, exact, path }) => {
  const auth = useAuth();
  return (
    <Route exact={exact} path={path}>
      {auth.userToken ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => (
  <ProvideAuth>
    <Router>
      <AppNavbar />

      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  </ProvideAuth>
);

const Home = () => (<h3>Home</h3>);

const NoMatch = () => (<h3>404 (not found)</h3>);

export default App;
