import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { addMessages } from '../store/slices/messagesSlice';
import { addChannels, setChannelId } from '../store/slices/channelsSlice';
import routes from '../routes';
import Channels from './Sidebar/Channels';
import { closeModal, openModal } from '../store/slices/modalsSlice';
import Messages from './Body/Messages';
import Modal from './Modals/index';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleOpen = (type, id = null) => () => {
    dispatch(openModal({ type, id }));
  };
  const handleClose = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.data(), { headers: auth.getAuthHeader() });
        const { data } = response;
        dispatch(addMessages(data.messages));
        dispatch(addChannels(data.channels));
        dispatch(setChannelId(data.currentChannelId));
      } catch (err) {
        if (!err.AxiosError) {
          toast.err(t('errors.unknown'));
        }
        if (err.response?.status === '401') {
          navigate(routes.loginPath());
        } else {
          toast.err(t('error.network'));
        }
      }
    };
    fetchData();
  }, [dispatch, t, auth, navigate]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded">
      <Row className="h-100 bg-white flex-md-row w-100">
        <Channels handleOpen={handleOpen} />
        <Messages />
      </Row>
      <Modal onHide={handleClose} />
    </Container>
  );
};

export default Chat;