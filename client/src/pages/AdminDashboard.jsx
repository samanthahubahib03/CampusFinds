import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import { useItems } from '../context/ItemsContext.jsx';
import { timeAgo } from '../utils/helpers.js';

export default function AdminDashboard() {
  const { items, updateItem, removeItem } = useItems();
  const [confirmId, setConfirmId] = useState(null);

  const active = items.filter((i) => i.status !== 'Claimed');
  const stats = [
    { label: 'Total posts', value: items.length },
    { label: 'Lost, open', value: active.filter((i) => i.report_type === 'Lost').length },
    { label: 'Found, open', value: active.filter((i) => i.report_type === 'Found').length },
    { label: 'Claimed', value: items.length - active.length },
  ];
  const sorted = [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <main className="container page">
      <div className="page-head banner">
        <div>
          <h1>Admin dashboard</h1>
          <p className="muted">Review reports, resolve claims, and remove duplicates.</p>
        </div>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Item</th><th>Status</th><th>Location</th><th>Posted by</th><th>Posted</th><th aria-label="Actions" /></tr>
          </thead>
          <tbody>
            {sorted.map((i) => (
              <tr key={i.item_id}>
                <td><Link to={`/items/${i.item_id}`} className="row-title">{i.title}</Link><small className="muted">{i.category}</small></td>
                <td><Badge item={i} /></td>
                <td>{i.location}</td>
                <td>{i.poster_name}</td>
                <td className="nowrap">{timeAgo(i.created_at)}</td>
                <td className="row-actions">
                  {confirmId === i.item_id ? (
                    <>
                      <button className="btn btn-ghost btn-sm" onClick={() => setConfirmId(null)}>Cancel</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { removeItem(i.item_id); setConfirmId(null); }}>Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline btn-sm" onClick={() => updateItem(i.item_id, { status: i.status === 'Claimed' ? 'Unclaimed' : 'Claimed' })}>
                        {i.status === 'Claimed' ? 'Reopen' : 'Mark claimed'}
                      </button>
                      <button className="btn btn-ghost btn-sm danger-text" onClick={() => setConfirmId(i.item_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!sorted.length && <tr><td colSpan="6" className="muted center">No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
}
