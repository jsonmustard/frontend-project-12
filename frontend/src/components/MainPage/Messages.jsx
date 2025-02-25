import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();

  const { messages, currentChannelId, channels } = useSelector((state) => ({
    messages: state.messages.messages,
    currentChannelId: state.channels.currentChannelId,
    channels: state.channels.channels,
  }));

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [currentChannelId, messages]);

  const numberOfMessages = messages.filter((msg) => msg.channelId === currentChannel?.id).length;

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${filter.clean(currentChannel?.name)}`}
          </b>
        </p>
        <span className="text-muted">
          {numberOfMessages}
          {' '}
          {t('mainPage.messagesCounter', { count: numberOfMessages })}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5"
        ref={messagesBoxRef}
      >
        {messages
          .filter((msg) => msg.channelId === currentChannel?.id)
          .map((msg) => (
            <div
              className="text-break mb-2"
              key={msg.id}
            >
              <b>{msg.username}</b>
              {': '}
              {filter.clean(msg.body)}
            </div>
          ))}
      </div>
    </>
  );
};

export default Messages;
