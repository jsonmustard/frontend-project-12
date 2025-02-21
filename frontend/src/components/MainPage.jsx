import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import {
  setChannels,
  setCurrentChannelId,
  setChannelToRemoveId,
  setChannelToEditId,
  toggleAddChannelModal,
  toggleRemoveChannelModal,
  toggleEditChannelModal,
} from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';

const { token, username } = window.localStorage;

const MainPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const messagesBoxRef = useRef(null);

  const data = useSelector((state) => ({
    ...state.auth,
    ...state.channels,
    ...state.messages,
    ...state.currentChannelId,
  }));

  const {
    channels, messages, currentChannelId,
  } = data;

  const initialValues = {
    body: '',
  };

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .trim()
      .required(t('errors.required')),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([channelsRes, messagesRes]) => {
        dispatch(setChannels({ channels: channelsRes.data }));
        dispatch(setMessages({ messages: messagesRes.data }));
        dispatch(setCurrentChannelId({ currentChannelId: channelsRes.data[0]?.id }));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const newMessage = {
      body: values.body,
      channelId: currentChannelId,
      username,
    };

    axios
      .post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!token) {
      window.location.replace('login');
      return null;
    }

    const fetchChannels = axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchMessages = axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchChannels
      .then((response) => {
        dispatch(setChannels({ channels: response.data }));
        dispatch(
          setCurrentChannelId({ currentChannelId: response.data[0].id }),
        );
      })
      .catch((error) => {
        console.error('Error fetching channels:', error);
      });

    fetchMessages
      .then((response) => {
        dispatch(setMessages({ messages: response.data }));
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });

      return null;
  }, [dispatch]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [currentChannelId, messages]);

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

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  const renderHeader = () => (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`# ${filter.clean(currentChannel?.name)}`}
        </b>
      </p>
      <span className="text-muted">
        {messages.filter((msg) => msg.channelId === currentChannel?.id).length}
        {t('mainPage.messagesCounter', {
          count: messages.filter((msg) => msg.channelId === currentChannel?.id).length,
        })}
      </span>
    </div>
  );

  const renderChannels = () => (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
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
                onClick={(e) => handleChannelClick(e.target.id)}
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

  const renderMessages = () => (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesBoxRef}
    >
      {messages.filter((msg) => msg.channelId === currentChannel?.id).map((msg) => (
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
  );

  const isSubmitDisabled = formik.isSubmitting || !formik.values.body.trim();

  const renderMessageForm = () => (
    <div className="mt-auto px-5 py-3">
      <form
        onSubmit={formik.handleSubmit}
        noValidate=""
        className="py-1 border rounded-2"
      >
        <div className="input-group has-validation">
          <input
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            placeholder={t('mainPage.messageInputPlaceholder')}
            aria-label={t('mainPage.newMessage')}
            className="border-0 p-0 ps-2 form-control"
            disabled={formik.isSubmitting}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={isSubmitDisabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
            <span className="visually-hidden">
              Отправить
            </span>
          </button>
        </div>
      </form>
    </div>
  );

  const renderLoader = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner
        className="spinner-border text-primary"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </Spinner>
    </div>
  );

  return (
    isLoading
      ? renderLoader()
      : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            {renderChannels()}
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                {renderHeader()}
                {renderMessages()}
                {renderMessageForm()}
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default MainPage;
