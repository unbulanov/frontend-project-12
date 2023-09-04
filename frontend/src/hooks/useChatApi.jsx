import { useContext } from 'react';
import { ChatApiContext } from '../contexts/ChatContext';

const useChatApi = () => useContext(ChatApiContext);

export default useChatApi;