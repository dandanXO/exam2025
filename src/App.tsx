import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QRCodePage from './pages/QRCodePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrcode" element={<QRCodePage />} />
      </Routes>
    </BrowserRouter>
  );
}
