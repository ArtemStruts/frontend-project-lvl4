import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';

const AddChannel = (props) => {
  const { onExited } = props;
  const [addFailed, setAddFailed] = useState(false);
  const [show, setShow] = useState(true);
  const inputRef = useRef();
  const { t } = useTranslation();

  const socket = useSocket();
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);

  const channelNameSchema = yup.object().shape({
    name: yup.string().min(3, t('errors.wrongLength')).max(20, t('errors.wrongLength')).required(),
  });

  useEffect(() => {
    inputRef.current.focus();
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
      const channel = { name };
      socket.emit('newChannel', channel, ({ status }) => {
        if (status === 'ok') {
          setSubmitting(false);
          onHide();
        }
      });
    }
  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema,
    onSubmit: handlerSubmit(),
  });

  return (
    <Modal show={show} onExited={onExited} onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              name="name"
              data-testid="add-channel"
              required
              onChange={f.handleChange}
              isInvalid={addFailed || f.errors.name}
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

export default AddChannel;
