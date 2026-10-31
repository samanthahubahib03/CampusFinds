import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user.role === 'Admin';

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand"><Logo />CampusFinds</Link>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/feed">Feed</NavLink>
          {isAdmin && <NavLink to="/admin">Dashboard</NavLink>}
        </nav>
        <div className="nav-user">
          <div className="nav-who">
            <span>{user.full_name}</span>
            <small>{user.role}</small>
          </div>
          <button className="btn btn-ghost" onClick={() => { logout(); navigate('/'); }}>Sign out</button>
        </div>
      </div>
    </header>
  );
}
