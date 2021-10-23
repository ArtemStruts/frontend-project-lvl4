import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Messages from './Messages.jsx';
import Channels from './Channels.jsx';
import routes from '../routes.js';
import { setInitialChannelsState } from '../slices/channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(setInitialChannelsState(data));
        setIsLoaded(true);
      } catch (e) {
        setIsLoaded(false);
        throw e;
      }
    };
    fetchContent();
  }, []);
  if (isLoaded) {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </div>
    );
  } return null;
};

export default Chat;
