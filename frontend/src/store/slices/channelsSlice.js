import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState(
  {
    currentChannelId: 1,
    defaultChannelId: 1,
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannelId: (state, { payload }) => {
      if (payload === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
  },
});

export const { addChannel, addChannels, renameChannel, removeChannel, setChannelId, setDefaultChannelId  } = channelsSlice.actions;

export const {
  selectAll: selectAllChannels,
} = channelsAdapter.getSelectors((state) => state.channels);

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  return state.channels.entities[currentChannelId]
};

export default channelsSlice.reducer;