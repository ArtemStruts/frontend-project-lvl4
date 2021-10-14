import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { authContext, socketContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import AppNavbar from './Navbar.jsx';
import { addMessage } from '../slices/messagesSlice.js';

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

const ProvideSocket = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
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

const App = () => (
  <ProvideAuth>
    <ProvideSocket>
      <Router>
        <AppNavbar />

        <Switch>
          <PrivateRoute exact path="/">
            <Chat />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </ProvideSocket>
  </ProvideAuth>
);

const NoMatch = () => (<h3>404 (not found)</h3>);

export default App;
