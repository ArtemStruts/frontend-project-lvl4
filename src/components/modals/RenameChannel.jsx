import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';

const RenameChannel = (props) => {
  const { onExited } = props;
  const [addFailed, setAddFailed] = useState(false);
  const [show, setShow] = useState(true);
  const inputRef = useRef();

  const socket = useSocket();

  const channels = useSelector((state) => state.channels.channels);
  const channelId = useSelector((state) => state.modals.channelId);
  const channelsNames = channels.map(({ name }) => name);
  const channelName = useSelector((state) => state.modals.channelName);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const onHide = () => {
    setShow(false);
  };

  const handlerSubmit = () => ({ name }, { setSubmitting }) => {
    setAddFailed(false);
    if (channelsNames.includes(name)) {
      setAddFailed(true);
      setSubmitting(false);
    } else {
      const channel = { name, id: channelId };
      socket.emit('renameChannel', channel, ({ status }) => {
        if (status === 'ok') {
          setSubmitting(false);
          onHide();
        }
      });
    }
  };

  const f = useFormik({
    initialValues: {
      name: channelName,
    },
    onSubmit: handlerSubmit(),
  });

  return (
    <Modal.Dialog>
      <Modal show={show} onExited={onExited} centered>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={f.handleSubmit}>
            <FormGroup>
              <FormControl
                className="mb-2"
                name="name"
                data-testid="rename-channel"
                required
                onChange={f.handleChange}
                isInvalid={addFailed}
                value={f.values.name}
                readOnly={f.isSubmitting}
                ref={inputRef}
              />
              <FormControl.Feedback type="invalid">Должно быть уникальным</FormControl.Feedback>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="button" onClick={onHide} disabled={f.isSubmitting}>Отменить</Button>
                <Button variant="primary" type="submit" disabled={f.isSubmitting}>Отправить</Button>
              </div>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    </Modal.Dialog>
  );
};

export default RenameChannel;
