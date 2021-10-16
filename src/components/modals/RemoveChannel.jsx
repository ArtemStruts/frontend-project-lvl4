import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannel = (props) => {
  const { onExited } = props;
  const [show, setShow] = useState(true);
  const channelId = useSelector((state) => state.modals.channelId);
  const socket = useSocket();

  const onHide = () => {
    setShow(false);
  };

  const f = useFormik({
    initialValues: {},
    onSubmit: () => {
      const channel = { id: channelId };
      socket.emit('removeChannel', channel, ({ status }) => {
        if (status === 'ok') {
          f.setSubmitting(false);
          onHide();
        }
      });
    },
  });

  return (
    <Modal.Dialog>
      <Modal show={show} onExited={onExited} centered>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={f.handleSubmit}>
            <FormGroup>
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" type="button" onClick={onHide} disabled={f.isSubmitting}>Отменить</Button>
                <Button variant="danger" type="submit" disabled={f.isSubmitting}>Удалить</Button>
              </div>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    </Modal.Dialog>
  );
};

export default RemoveChannel;
