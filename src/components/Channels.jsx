import React from 'react';
import {
  Col,
  Nav,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channelsSlice.js';
import { showModal } from '../slices/modalsSlice.js';

const getButtonVariant = (id, currentChannelId) => (id === currentChannelId ? 'secondary' : 'light');

const NonRemovableChannel = ({ id, name, handleChange }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  return (
    <Button className="w-100 rounded-0 text-start" variant={getButtonVariant(id, currentChannelId)} type="button" onClick={handleChange(id)}>
      <span className="me-1">
        #
        {name}
      </span>
    </Button>
  );
};

const RemovableChannel = ({ id, name, handleChange }) => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const handleRemoveChannel = () => {
    dispatch(showModal({ type: 'removing', id }));
  };

  const handleRenameChannel = () => {
    dispatch(showModal({ type: 'renaming', id, name }));
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button className="w-100 rounded-0 text-start" variant={getButtonVariant(id, currentChannelId)} type="button" onClick={handleChange(id)}>
        <span className="me-1">
          #
          {name}
        </span>
      </Button>

      <Dropdown.Toggle split variant={getButtonVariant(id, currentChannelId)} />

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = () => {
    dispatch(showModal({ type: 'adding' }));
  };

  const handleChangeChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  return (
    <Col sm={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.titles.channels')}</span>
        <Button variant="outline-light" className="p-0 text-primary" onClick={handleAddChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            <span className="visuallyHidden">+</span>
          </svg>
        </Button>
      </div>
      <Nav as="ul" variant="pills" fill className="flex-column px-2">
        {channels.map(({ id, name, removable }) => {
          const Channel = removable ? RemovableChannel : NonRemovableChannel;
          return (
            <Nav.Item as="li" className="w-100" key={id}>
              <Channel id={id} name={name} handleChange={handleChangeChannel} />
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
