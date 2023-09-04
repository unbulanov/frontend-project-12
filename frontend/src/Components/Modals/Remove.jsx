import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useChatApi';
import { getChannelId } from '../../store/slices/modalsSlice';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const api = useChatApi();
  const channelId = useSelector(getChannelId);
  const notify = () => toast.success(t('notify.deleteChannel'));
  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleSucces = () => {
    handleClose();
    notify();
  };
  const handleDelete = () => {
    api.deleteChannel(channelId, handleSucces);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.uSure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button type="submit" onClick={handleDelete} variant="danger">{t('modal.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;