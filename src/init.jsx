import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { socketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import i18n from './i18n.js';
import App from './components/App.jsx';
import store from './store.js';

export default () => {
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

  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ProvideSocket>
          <App />
        </ProvideSocket>
      </Provider>
    </I18nextProvider>,
    document.getElementById('chat'),
  );
};
