import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { getCurrentChannelId, selectAllChannels, setChannelId } from '../../store/slices/channelsSlice';

const Channels = ({ handleOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const handleRename = (id) => handleOpen('renaming', id);
  const handleRemove = (id) => handleOpen('removing', id);
  const channelsList = () => {
    const elem = channels.map(({ name, removable, id }) => {
      const btnClasses = cn('btn', {
        'btn-secondary': id === currentChannelId,
      });
      const variant = id === currentChannelId ? 'secondary' : 'light';
      if (!removable) {
        return (
          <li className="nav-item w-100" key={id}>
            <button
              type="button"
              onClick={() => dispatch(setChannelId(id))}
              className={`w-100 rounded-0 text-start ${btnClasses}`}
            >
              #
              {' '}
              {name}
            </button>
          </li>
        );
      }

      return (
        <li key={id}>
          <div role="group" className="d-flex dropdown btn-group">
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={variant}
                className="text-start w-100 tet-truncate"
                onClick={() => {
                  dispatch(setChannelId(id));
                }}
              >
                #
                {' '}
                {name}
              </Button>
              <Dropdown.Toggle
                split
                variant={variant}
                className="flex-grow-0 text-end"
              >
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleRemove(id)}>{t('channels.delete')}</Dropdown.Item>
                <Dropdown.Item onClick={handleRename(id)}>{t('channels.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      );
    });
    return elem;
  };

  const handleAdd = () => handleOpen('adding');
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column  d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          onClick={handleAdd()}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList()}
      </ul>
    </Col>
  );
};

export default Channels;