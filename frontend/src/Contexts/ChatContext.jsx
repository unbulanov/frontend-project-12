import React, { createContext, useEffect } from 'react';
import { addMessage } from '../store/slices/messagesSlice';
import store from '../store/store';
import {
  addChannel, removeChannel, renameChannel, setChannelId, setDefaultChannelId,
} from '../store/slices/channelsSlice';

export const ChatApiContext = createContext({});

const ChatApiProvider = ({ socket, children }) => {
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      store.dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      store.dispatch(addChannel(payload));
    });
    socket.on('removeChannel', ({ id }) => {
      store.dispatch(setDefaultChannelId(id));
      store.dispatch(removeChannel(id));
    });
    socket.on('renameChannel', ({ id, name }) => {
      store.dispatch(renameChannel({ id, changes: { name } }));
    });
  }, [socket]);

  const sendMessage = (data) => {
    socket.emit('newMessage', (data));
  };
  const newChannel = (name, cb) => {
    socket.emit('newChannel', { name }, (responce) => {
      const { status, data: { id } } = responce;
      if (status === 'ok') {
        store.dispatch(setChannelId(id));
        cb();
      }
    });
  };
  const deleteChannel = (id, cb) => {
    socket.emit('removeChannel', { id }, (responce) => {
      const { status } = responce;
      if (status === 'ok') {
        cb();
      }
    });
  };

  const updateNameChannel = ({ id, name }, cb) => {
    socket.emit('renameChannel', { id, name }, (responce) => {
      const { status } = responce;
      if (status === 'ok') {
        cb();
      }
    });
  };

  const value = {
    sendMessage,
    newChannel,
    deleteChannel,
    updateNameChannel,
  };
  return (
    <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>
  );
};

export default ChatApiProvider;