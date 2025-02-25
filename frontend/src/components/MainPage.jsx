import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  setChannels,
  setCurrentChannelId,
} from '../slices/channelsSlice';
import { setMessages } from '../slices/messagesSlice';
import Messages from './MainPage/Messages';
import Channels from './MainPage/Channels';
import MessageForm from './MainPage/MessageForm';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = window.localStorage;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [channelsRes, messagesRes] = await Promise.all([
          axios.get('/api/v1/channels', { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
          axios.get('/api/v1/messages', { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
        ]);
        
        dispatch(setChannels({ channels: channelsRes.data }));
        dispatch(setMessages({ messages: messagesRes.data }));
        dispatch(setCurrentChannelId({ currentChannelId: channelsRes.data[0]?.id }));
      } catch (error) {
        if (error.response?.status === 401) {
          window.localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, token, navigate]);

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
            <Channels />
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages />
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default MainPage;
