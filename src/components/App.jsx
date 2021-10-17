import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { authContext, socketContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import AppNavbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice.js';
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

const ProvideSocket = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(renameChannel({ id, name }));
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
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
          {renderModal(type, onExited)}
        </Router>
      </ProvideSocket>
    </ProvideAuth>
  );
};

const NoMatch = () => (<h3>404 (not found)</h3>);

export default App;
