import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import ItemForm from '../components/ItemForm.jsx';
import ClaimForm, { CLEAR_CLAIM } from '../components/ClaimForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useItems } from '../context/ItemsContext.jsx';
import { canManage, timeAgo } from '../utils/helpers.js';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getItem, updateItem, removeItem } = useItems();
  const [editing, setEditing] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const item = getItem(id);

  if (!item) {
    return (
      <main className="container page">
        <div className="empty">
          <h3>This post is no longer available</h3>
          <p className="muted">It may have been resolved or removed.</p>
          <Link className="btn btn-outline" to="/feed">Back to feed</Link>
        </div>
      </main>
    );
  }

  const manage = canManage(user, item);
  const claimed = item.status === 'Claimed';
  const claimedOn = item.claimed_at
    ? new Date(item.claimed_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '';

  return (
    <main className="container page">
      <Link to="/feed" className="back">← Back to feed</Link>
      <article className="detail">
        <div className="detail-media">
          {item.image_data ? <img src={item.image_data} alt={item.title} /> : <span className="card-ph">No photo</span>}
        </div>
        <div className="detail-info">
          <Badge item={item} />
          <h1>{item.title}</h1>
          <dl>
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>{item.report_type === 'Lost' ? 'Last seen' : 'Found at'}</dt><dd>{item.location}</dd></div>
            <div><dt>Contact</dt><dd>{item.contact_info}</dd></div>
            <div><dt>Posted by</dt><dd>{item.poster_name}, {timeAgo(item.created_at)}</dd></div>
          </dl>
          {item.description && <p className="detail-desc">{item.description}</p>}

          {/* Claim record: only the poster and admins can see who received the item */}
          {claimed && manage && item.claimed_by && (
            <section className="detail-desc" aria-label="Claim record">
              <h3>Claim record</h3>
              <dl>
                <div><dt>Received by</dt><dd>{item.claimed_by}</dd></div>
                <div><dt>Contact</dt><dd>{item.claimed_contact}</dd></div>
                {claimedOn && <div><dt>Claimed on</dt><dd>{claimedOn}</dd></div>}
                {item.released_by && <div><dt>Released by</dt><dd>{item.released_by}</dd></div>}
                {item.claim_notes && <div><dt>Notes</dt><dd>{item.claim_notes}</dd></div>}
              </dl>
              {item.claim_photo && (
                <img
                  src={item.claim_photo}
                  alt={`Handover of ${item.title}`}
                  style={{ width: '100%', maxWidth: 260, marginTop: '.75rem', borderRadius: 12, border: '1px solid var(--line)' }}
                />
              )}
            </section>
          )}

          {manage && (
            <div className="actions">
              {confirming ? (
                <>
                  <span className="muted">Delete this post permanently?</span>
                  <button className="btn btn-ghost" onClick={() => setConfirming(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={() => { removeItem(item.item_id); navigate(user.role === 'Admin' ? '/admin' : '/feed'); }}>Delete post</button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => (claimed ? updateItem(item.item_id, { status: 'Unclaimed', ...CLEAR_CLAIM }) : setClaiming(true))}
                  >
                    {claimed ? 'Reopen post' : 'Mark as claimed'}
                  </button>
                  <button className="btn btn-outline" onClick={() => setEditing(true)}>Edit</button>
                  <button className="btn btn-ghost danger-text" onClick={() => setConfirming(true)}>Delete</button>
                </>
              )}
            </div>
          )}
        </div>
      </article>

      {editing && (
        <ItemForm initial={item} onClose={() => setEditing(false)} onSubmit={(d) => { updateItem(item.item_id, d); setEditing(false); }} />
      )}

      {claiming && (
        <ClaimForm
          item={item}
          user={user}
          onClose={() => setClaiming(false)}
          onSubmit={(data) => { updateItem(item.item_id, data); setClaiming(false); }}
        />
      )}
    </main>
  );
}