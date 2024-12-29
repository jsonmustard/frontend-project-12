/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadAuthData } from '../slices/authSlice';
import BuildPage from './BuildPage';
import NotFoundPage from './NotFoundPage';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add('h-100');
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('h-100');
    }

    dispatch(loadAuthData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<BuildPage PageComponent={NotFoundPage} />} />
        <Route path="/" element={<BuildPage PageComponent={MainPage} />} />
        <Route path="login" element={<BuildPage PageComponent={LoginPage} />} />
        <Route path="signup" element={<BuildPage PageComponent={SignUpPage} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
