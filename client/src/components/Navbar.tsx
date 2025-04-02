import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">CRNTLY</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Notifications />
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}