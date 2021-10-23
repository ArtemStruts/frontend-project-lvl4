import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import AppNavbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import { hideModal } from '../slices/modalsSlice.js';
import getModal from './modals/index.js';

const ProvideAuth = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(userId);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, exact, path }) => {
  const auth = useAuth();

  return (
    <Route
      exact={exact}
      path={path}
    >
      {(auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login' }} />)}
    </Route>
  );
};

const renderModal = (type, onExited) => {
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component onExited={onExited} />;
};

const App = () => {
  const type = useSelector((state) => state.modals.type);
  const dispatch = useDispatch();
  const onExited = () => {
    dispatch(hideModal());
  };

  return (
    <ProvideAuth>
      <Router>
        <div className="d-flex flex-column h-100">
          <AppNavbar />

          <Switch>
            <PrivateRoute exact path="/">
              <Chat />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
        {renderModal(type, onExited)}
      </Router>
    </ProvideAuth>
  );
};

const NoMatch = () => (<h3>404 (not found)</h3>);

export default App;
