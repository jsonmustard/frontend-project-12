import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuildPage, NotFoundPage, LoginPage, MainPage } from './Components/Pages';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<BuildPage PageComponent={NotFoundPage} />} />
        <Route path="/" element={<BuildPage PageComponent={MainPage} />} />
        <Route path="login" element={<BuildPage PageComponent={LoginPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
