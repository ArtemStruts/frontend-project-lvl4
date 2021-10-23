import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannel = (props) => {
  const { onExited } = props;
  const [show, setShow] = useState(true);
  const channelId = useSelector((state) => state.modals.channelId);
  const socket = useSocket();
  const { t } = useTranslation();

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
    <Modal show={show} onExited={onExited} onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.titles.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <p className="lead">{t('modals.body.removeChannel')}</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" onClick={onHide} disabled={f.isSubmitting}>{t('buttons.cancel')}</Button>
              &nbsp;
              <Button variant="danger" type="submit" disabled={f.isSubmitting}>{t('buttons.remove')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
