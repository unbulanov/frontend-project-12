import React from 'react';
import { useSelector } from 'react-redux';
import Body from './MessageList';
import SendMessageForm from './SendMessageForm';
import Header from './Header';
import { getCurrentChannelId } from '../../store/slices/channelsSlice';
import { getMessages } from '../../store/selectors';

const Messages = () => {
  const messages = useSelector(getMessages);
  const currentChannelId = useSelector(getCurrentChannelId);
  const channelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <Body messages={channelMessages} />
        <SendMessageForm />
      </div>
    </div>
  );
};

export default Messages;