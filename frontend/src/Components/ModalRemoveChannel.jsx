import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentChannelId, removeChannel, toggleRemoveChannelModal } from '../slices/channelsSlice';
import { removeMessagesByChannel } from '../slices/messagesSlice';

const { token } = window.localStorage;

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => ({
    ...state.auth,
    ...state.channels,
    ...state.messages,
    ...state.currentChannelId,
    ...state.channelToRemoveId,
  }));

  const {
    auth, channels, messages, currentChannelId, channelToRemoveId,
  } = data;

  const handleRemove = () => {
    const messagesToDelete = messages.filter((message) => message.channelId === channelToRemoveId);

    const deleteMessagesPromises = messagesToDelete.map((message) =>
      axios.delete(`/api/v1/messages/${message.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    Promise.all([...deleteMessagesPromises])
    .then(() => {
      return axios.delete(`/api/v1/channels/${channelToRemoveId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(() => {
      dispatch(removeChannel(channelToRemoveId));
      dispatch(removeMessagesByChannel(channelToRemoveId));

      const remainingChannels = channels.filter(channel => channel.id !== channelToRemoveId);
      if (remainingChannels.length > 0) {
        dispatch(setCurrentChannelId({ currentChannelId: remainingChannels[0].id }));
      } else {
        dispatch(setCurrentChannelId({ currentChannelId: null })); // Если каналов нет, сбрасываем активный
      }

      dispatch(toggleRemoveChannelModal());
    })
    .catch((error) => {
      console.error('Error deleting channel or messages:', error);
    });
};


  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Удалить канал</div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                onClick={() => dispatch(toggleRemoveChannelModal())}
              />
            </div>
            <div className="modal-body">
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => dispatch(toggleRemoveChannelModal())}
                >
                  Отменить
                </button>
                <button type="button" className="btn btn-danger" onClick={handleRemove}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRemoveChannel;
