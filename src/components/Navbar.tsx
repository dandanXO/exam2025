import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">首頁</Link>
        </li>
        <li>
          <Link to="/qrcode" className="hover:text-gray-300">QRCode 產生器</Link>
        </li>
      </ul>
    </nav>
  );
}
