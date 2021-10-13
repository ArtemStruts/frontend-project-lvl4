import React, { useEffect } from 'react';
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
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(setInitialChannelsState(data));
    };
    fetchContent();
  }, []);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </div>
  );
};

export default Chat;
