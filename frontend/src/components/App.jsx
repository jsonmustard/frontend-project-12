import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadAuthData } from '../slices/authSlice';
import { addMessage } from '../slices/messagesSlice';
import socket from '../socket';
import { addChannel, editChannel } from '../slices/channelsSlice';
import BuildPage from './BuildPage';
import NotFoundPage from './NotFoundPage';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import axios from 'axios';

const App = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.localStorage.removeItem('token');
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add('h-100');
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('h-100');
    }

    dispatch(loadAuthData());

    socket.on('newMessage', (payload) => {
      dispatch(addMessage({ messages: payload }));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel({ channels: payload }));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(editChannel({ channels: payload }));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*" element={<BuildPage PageComponent={NotFoundPage} />}
        />
        <Route
          path="/" element={<BuildPage PageComponent={MainPage} />}
        />
        <Route
          path="login" element={<BuildPage PageComponent={LoginPage} />}
        />
        <Route path="signup" element={<BuildPage PageComponent={SignUpPage} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
