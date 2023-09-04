import { createSelector } from 'reselect';

const channelSelector = (state) => state.channels;

export const getChannelsNames = createSelector([channelSelector], (channels) => channels.ids.map((id) => channels.entities[id].name));

export const getCurrentChannel = (state) => {
  const { channelId } = state.modal;
  const channels = Object.values(state.channels.entities);
  return channels.find((channel) => channel.id === channelId);
};

const selectMessage = (state) => state.messages;

const selectMessageFromGetMessages = (state) => state.messages.ids.map((id) => state.messages.entities[id]);

const channelSelectorFromMessages = (state) => state.channels.currentChannelId;

export const getMessages = createSelector([selectMessage], (messages) => messages.ids.map((id) => messages.entities[id]));

export const getMessagesForCurrentChannel = createSelector([selectMessageFromGetMessages, channelSelectorFromMessages], (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId).slice());