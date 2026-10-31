import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import CampusArt from '../components/CampusArt.jsx';
import ItemCard from '../components/ItemCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useItems } from '../context/ItemsContext.jsx';
import { SCHOOL, CAMPUS_PHOTO } from '../config.js';

const I = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const CATS = [
  { name: 'ID / Wallet', text: 'School IDs, cards, and wallets', icon: <svg width="26" height="26" viewBox="0 0 24 24" {...I}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h4M6 16c.6-1.4 1.800-2 3-2s2.400.6 3 2" /></svg> },
  { name: 'Gadgets', text: 'Phones, calculators, flash drives', icon: <svg width="26" height="26" viewBox="0 0 24 24" {...I}><rect x="7" y="2.500" width="10" height="19" rx="2" /><path d="M11 18h2" /></svg> },
  { name: 'Tumbler / Personal', text: 'Tumblers, umbrellas, keys', icon: <svg width="26" height="26" viewBox="0 0 24 24" {...I}><path d="M7 3h10l-1.200 17a1.500 1.500 0 0 1-1.500 1.400H9.700A1.500 1.500 0 0 1 8.200 20L7 3Z" /><path d="M7.500 8h9" /></svg> },
  { name: 'Others', text: 'Bags, books, and everything else', icon: <svg width="26" height="26" viewBox="0 0 24 24" {...I}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg> },
];
const STEPS = [
  { t: 'Report it', d: 'Post what you lost or found with a photo and the building where it happened.' },
  { t: 'Search the feed', d: 'Filter by type, category, or keyword to spot a match in seconds.' },
  { t: 'Claim it', d: 'Contact the poster, collect the item, then mark the post as claimed.' },
];

export default function Landing() {
  const { user } = useAuth();
  const { items } = useItems();
  const open = items.filter((i) => i.status !== 'Claimed');
  const recent = [...open].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
  const home = user ? (user.role === 'Admin' ? '/admin' : '/feed') : '/login';

  return (
    <div className="land">
      <header className="land-nav">
        <div className="container land-nav-inner">
          <Link to="/" className="brand"><Logo />CampusFinds</Link>
          <nav aria-label="Sections">
            <a href="#how">How it works</a>
            <a href="#categories">Categories</a>
            <a href="#recent">Recent posts</a>
          </nav>
          <Link to={home} className="btn btn-primary">{user ? 'Open app' : 'Sign in'}</Link>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill"><i /> {SCHOOL.name}</span>
            <h1>Find what you lost. Return what you found.</h1>
            <p>{SCHOOL.tagline} Report an item, browse the live feed, and see right away when something has been claimed.</p>
            <div className="hero-cta">
              <Link to={home} className="btn btn-primary btn-lg">Report an item</Link>
              <Link to={home} className="btn btn-outline btn-lg">Browse the feed</Link>
            </div>
          </div>
          <div className="hero-art">
            {CAMPUS_PHOTO ? <img src={CAMPUS_PHOTO} alt={`${SCHOOL.name} campus`} /> : <CampusArt />}
            <div className="chip chip-a"><i className="dot dot-found" />Student ID found at Library</div>
            <div className="chip chip-b"><i className="dot dot-claimed" />Umbrella claimed</div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container band-grid">
          <div><strong>{items.length}</strong><span>items reported</span></div>
          <div><strong>{items.length - open.length}</strong><span>returned to owners</span></div>
          <div><strong>{open.length}</strong><span>waiting to be claimed</span></div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-head"><h2>How it works</h2><p className="muted">Three steps from missing to matched.</p></div>
          <ol className="steps">
            {STEPS.map((s, n) => (
              <li key={s.t}><span className="step-n">{n + 1}</span><h3>{s.t}</h3><p className="muted">{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="categories" className="section section-tint">
        <div className="container">
          <div className="section-head"><h2>What people report</h2><p className="muted">Every post is sorted into one of four categories.</p></div>
          <div className="cats">
            {CATS.map((c) => (
              <div className="cat" key={c.name}><span className="cat-icon">{c.icon}</span><h3>{c.name}</h3><p className="muted">{c.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="recent" className="section">
        <div className="container">
          <div className="section-head row-between">
            <div><h2>Recently reported</h2><p className="muted">The newest items still waiting to be claimed.</p></div>
            <Link to={home} className="btn btn-outline">See all posts</Link>
          </div>
          <div className="grid">{recent.map((i) => <ItemCard key={i.item_id} item={i} />)}</div>
        </div>
      </section>

      <section className="container">
        <div className="cta">
          <div><h2>Lost something today?</h2><p>Post it now. The sooner it is on the feed, the sooner someone can spot it.</p></div>
          <Link to={home} className="btn btn-gold btn-lg">Report an item</Link>
        </div>
      </section>

      <footer className="land-foot">
        <div className="container foot-inner">
          <span className="brand"><Logo light />CampusFinds</span>
          <span>{SCHOOL.name}, {SCHOOL.location}</span>
        </div>
      </footer>
    </div>
  );
}
