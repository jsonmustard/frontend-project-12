import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadAuthData } from './slices/authSlice';
import BuildPage from './Components/BuildPage';
import NotFoundPage from './Components/NotFoundPage';
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
