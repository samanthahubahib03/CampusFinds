import { useMemo, useState } from 'react';
import ItemCard from '../components/ItemCard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import { useItems, CATEGORIES } from '../context/ItemsContext.jsx';

const FILTERS = ['All', 'Lost', 'Found', 'Claimed'];

export default function Home() {
  const { items, createItem } = useItems();
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => {
        if (filter === 'Claimed') return i.status === 'Claimed';
        if (filter === 'All') return true;
        return i.report_type === filter && i.status !== 'Claimed';
      })
      .filter((i) => !category || i.category === category)
      .filter((i) => !q || [i.title, i.location, i.description].some((t) => (t || '').toLowerCase().includes(q)))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [items, filter, category, query]);

  return (
    <main className="container page">
      <div className="page-head banner">
        <div>
          <h1>Campus feed</h1>
          <p className="muted">Browse items reported lost or found around campus.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>Report an item</button>
      </div>

      <div className="toolbar">
        <div className="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by item, building, or description" aria-label="Search items" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="segmented" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {visible.length ? (
        <div className="grid">{visible.map((i) => <ItemCard key={i.item_id} item={i} />)}</div>
      ) : (
        <div className="empty">
          <h3>No items match</h3>
          <p className="muted">Try a different filter, or report the item yourself.</p>
          <button className="btn btn-outline" onClick={() => setOpen(true)}>Report an item</button>
        </div>
      )}

      {open && <ItemForm onClose={() => setOpen(false)} onSubmit={(d) => { createItem(d); setOpen(false); setFilter('All'); }} />}
    </main>
  );
}
