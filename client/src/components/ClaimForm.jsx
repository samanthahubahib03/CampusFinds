import { useEffect, useState } from 'react';
import { fileToBase64 } from '../utils/helpers.js';

// Used when an item is reopened, so the old claim record is cleared.
export const CLEAR_CLAIM = {
  claimed_by: null,
  claimed_contact: null,
  claim_notes: null,
  claim_photo: null,
  claimed_at: null,
  released_by: null,
  released_by_id: null,
};

export default function ClaimForm({ item, user, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const pickPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setBusy(true);
    setError('');
    try {
      setPhoto(await fileToBase64(file));
    } catch {
      setError('Could not read that photo. Please try another one.');
    } finally {
      setBusy(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError('Enter the full name of the person who received the item.');
    if (!contact.trim()) return setError('Enter a student ID or contact number.');
    if (!photo) return setError('Add a photo of the handover.');
    onSubmit({
      status: 'Claimed',
      claimed_by: name.trim(),
      claimed_contact: contact.trim(),
      claim_notes: notes.trim(),
      claim_photo: photo,
      claimed_at: new Date().toISOString(),
      released_by: user?.name || '',
      released_by_id: user?.user_id ?? null,
    });
  };

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="claim-title" onSubmit={submit}>
        <div className="modal-head">
          <div>
            <h2 id="claim-title">Mark as claimed</h2>
            <p className="muted">{item.title}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <label className="field">Received by (full name)
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maria Santos" autoFocus />
        </label>

        <label className="field">Student ID or contact number
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. 21-1234-567 or 0917 123 4567" />
        </label>

        <div className="field">
          <span>Photo of the handover</span>
          <div className="photo-pick">
            {photo && <img src={photo} alt="Handover preview" />}
            <input type="file" accept="image/*" onChange={pickPhoto} aria-label="Choose handover photo" />
          </div>
          <small className="muted">Show the owner receiving the item. Avoid showing ID numbers.</small>
        </div>

        <label className="field">Notes (optional)
          <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything worth recording about the handover" />
        </label>

        <p className="muted">
          Recorded automatically: {new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          {user?.name ? `, released by ${user.name}` : ''}.
        </p>

        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Reading photo...' : 'Confirm claim'}</button>
        </div>
      </form>
    </div>
  );
}