import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import CampusArt from '../components/CampusArt.jsx';
import { useAuth, DEMO_USERS } from '../context/AuthContext.jsx';
import { SCHOOL, CAMPUS_PHOTO } from '../config.js';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(DEMO_USERS[0].user_id);

  if (user) return <Navigate to={user.role === 'Admin' ? '/admin' : '/feed'} replace />;

  const submit = (e) => {
    e.preventDefault();
    const u = login(selected);
    if (u) navigate(u.role === 'Admin' ? '/admin' : '/feed', { replace: true });
  };

  return (
    <main className="login">
      <section className="login-intro">
        <Link to="/" className="brand"><Logo light />CampusFinds</Link>
        <div>
          <h1>Lost it on campus? Someone may have already found it.</h1>
          <p>One place to report, search, and claim lost belongings at {SCHOOL.name}.</p>
        </div>
        <div className="login-art"><CampusArt /></div>
         {/*  <div className="login-art"><img src={CAMPUS_PHOTO} /></div> */}


      </section>

      <section className="login-panel">
        <form onSubmit={submit} className="login-card">
          <Logo size={40} />
          <h2>Sign in</h2>
          <p className="muted">Temporary access for development. Pick an account to continue.</p>
          <label className="field">Sign in as
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              {DEMO_USERS.map((u) => (
                <option key={u.user_id} value={u.user_id}>{u.role}: {u.full_name}</option>
              ))}
            </select>
          </label>
          <button className="btn btn-primary btn-block" type="submit">Continue</button>
          <p className="login-note">School ID and password sign-in will replace this once the API is connected.</p>
        </form>
      </section>
    </main>
  );
}
