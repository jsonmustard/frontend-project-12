import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuildPage from './Components/BuildPage';
import NotFoundPage from './Components/NotFoundPage';
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<BuildPage PageComponent={NotFoundPage} />} />
      <Route path="/" element={<BuildPage PageComponent={MainPage} />} />
      <Route path="login" element={<BuildPage PageComponent={LoginPage} />} />
    </Routes>
  </BrowserRouter>
);

export default App;
