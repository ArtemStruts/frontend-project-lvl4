import React, { useEffect, useRef } from 'react';
import {
  Col,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../hooks/index.jsx';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const socket = useSocket();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const f = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { setSubmitting, resetForm }) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));
      const message = { body, channelId: currentChannelId, username };
      socket.emit('newMessage', message, ({ status }) => {
        if (status === 'ok') {
          setSubmitting(false);
          resetForm();
        }
      });
    },
  });

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={f.handleSubmit}>
      <InputGroup className="has-validation">
        <Form.Control
          className="border-0 p-0 ps-2"
          name="body"
          data-testid="new-message"
          placeholder={t('text.enterMessage')}
          ref={inputRef}
          value={f.values.body}
          onChange={f.handleChange}
          readOnly={f.isSubmitting}
        />
        <Button variant="light" type="submit" disabled={f.isSubmitting || !f.values.body}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            <span className="visuallyHidden">{t('buttons.send')}</span>
          </svg>
        </Button>
      </InputGroup>
    </Form>
  );
};

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((item) => item.id === currentChannelId);
  const currentChannelMessages = messages
    .filter(({ channelId }) => Number(channelId) === currentChannelId);

  const messageBox = useRef();
  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel && currentChannel.name}`}</b>
          </p>
          <span className="text-muted">{t('chat.messages.counter.key', { count: currentChannelMessages.length })}</span>
        </div>
        <div id="messages-box" ref={messageBox} className="overflow-auto px-5">
          {currentChannelMessages.map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              :
              &nbsp;
              {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
