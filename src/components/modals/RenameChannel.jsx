import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RenameChannel = (props) => {
  const { onExited } = props;
  const [addFailed, setAddFailed] = useState(false);
  const [show, setShow] = useState(true);
  const inputRef = useRef();

  const socket = useSocket();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channels);
  const channelId = useSelector((state) => state.modals.channelId);
  const channelsNames = channels.map(({ name }) => name);
  const channelName = useSelector((state) => state.modals.channelName);

  const channelNameSchema = yup.object().shape({
    name: yup.string().min(3, t('errors.wrongLength')).max(20, t('errors.wrongLength')).required(),
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const onHide = () => {
    setShow(false);
  };

  const handlerSubmit = ({ name }, { setSubmitting }) => {
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
    validationSchema: channelNameSchema,
    onSubmit: handlerSubmit,
  });

  return (
    <Modal show={show} onExited={onExited} onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.titles.renameChannel')}</Modal.Title>
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
              isInvalid={f.errors.name || addFailed}
              value={f.values.name}
              readOnly={f.isSubmitting}
              ref={inputRef}
            />
            <FormControl.Feedback type="invalid">{addFailed ? t('errors.mustBeUnique') : f.errors.name}</FormControl.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" onClick={onHide} disabled={f.isSubmitting}>{t('buttons.cancel')}</Button>
              &nbsp;
              <Button variant="primary" type="submit" disabled={f.isSubmitting}>{t('buttons.send')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
