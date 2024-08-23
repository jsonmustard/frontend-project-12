import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage, LoginPage } from './Components/Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {"404"}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LoginPage
         />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
