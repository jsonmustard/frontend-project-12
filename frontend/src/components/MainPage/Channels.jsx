import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import {
  setCurrentChannelId,
  setChannelToRemoveId,
  setChannelToEditId,
  toggleAddChannelModal,
  toggleRemoveChannelModal,
  toggleEditChannelModal,
} from '../../slices/channelsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => ({
    channels: state.channels.channels,
    currentChannelId: state.channels.currentChannelId,
  }));

  const handleChannelClick = (id) => dispatch(setCurrentChannelId({ currentChannelId: id }));

  const handleAddChannelModal = (status) => {
    dispatch(toggleAddChannelModal({ isActiveAddChannelModal: status }));
  };

  const handleRemoveChannelModal = (status, channelId) => {
    dispatch(toggleRemoveChannelModal({ isActiveRemoveChannelModal: status }));
    dispatch(setChannelToRemoveId({ channelToRemoveId: channelId }));
  };

  const handleEditChannelModal = (status, channelId) => {
    dispatch(toggleEditChannelModal({ isActiveRenameChannelModal: status }));
    dispatch(setChannelToEditId({ channelToEditId: channelId }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleAddChannelModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">
            +
          </span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li
            className="nav-item w-100"
            key={channel.id}
          >
            <div
              role="group"
              className="d-flex dropdown btn-group"
            >
              <button
                id={channel.id}
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${currentChannelId === channel.id ? 'btn-secondary' : ''}`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <span className="me-1">#</span>
                {filter.clean(channel.name)}
              </button>
              {channel.removable && (
                <button
                  type="button"
                  id={`dropdown-${channel.id}`}
                  aria-expanded="false"
                  className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${currentChannelId === channel.id ? 'btn-secondary' : ''}`}
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-controls={`dropdown-menu-${channel.id}`}
                >
                  <span className="visually-hidden">
                    {t('mainPage.channelManagement')}
                  </span>
                </button>
              )}
              {channel.removable && (
                <div
                  id={`dropdown-menu-${channel.id}`}
                  className="dropdown-menu"
                  aria-labelledby={`dropdown-${channel.id}`}
                >
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleRemoveChannelModal(true, channel.id)}
                  >
                    {t('mainPage.removeButton')}
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleEditChannelModal(true, channel.id)}
                  >
                    {t('mainPage.editButton')}
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
