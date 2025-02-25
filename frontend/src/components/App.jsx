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
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from '../../public/locales/ru.json';

// Инициализируем i18next вне компонента
i18next
  .use(initReactI18next) // важно подключить React адаптер
  .init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        translation: ru,
      },
    },
    interpolation: {
      escapeValue: false, // не нужно экранировать для React
    },
  });

const App = () => {
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
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={(
              <BuildPage
                PageComponent={NotFoundPage}
              />
            )}
          />
          <Route
            path="/"
            element={(
              <BuildPage
                PageComponent={MainPage}
              />
            )}
          />
          <Route
            path="login"
            element={(
              <BuildPage
                PageComponent={LoginPage}
              />
            )}
          />
          <Route
            path="signup"
            element={(
              <BuildPage
                PageComponent={SignUpPage}
              />
            )}
          />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
