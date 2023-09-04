import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messageRef = useRef(null);
  const lastMessage = messages[messages.length - 1];
  useEffect(() => {
    if (lastMessage) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });
  return messages.map(({ username, body, id }) => (
    <div key={id} className="text-break mb-2" ref={messageRef}>
      <b>{username}</b>
      {': '}
      {body}
    </div>
  ));
};

const Body = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    <MessageList messages={messages} />
  </div>
);
export default Body;