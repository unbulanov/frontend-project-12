import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messagesSlice';
import channelReducer from './slices/channelsSlice';
import modalReducer from './slices/modalsSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
    modal: modalReducer,
  },
});