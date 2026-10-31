import { useEffect, useState } from 'react';
import { CATEGORIES } from '../context/ItemsContext.jsx';
import { fileToBase64 } from '../utils/helpers.js';

const EMPTY = { report_type: 'Lost', title: '', category: CATEGORIES[0], location: '', description: '', contact_info: '', image_data: null };

export default function ItemForm({ initial, onSubmit, onClose }) {
  const editing = Boolean(initial);
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [error, setError] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const pickPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { set('image_data', await fileToBase64(file)); }
    catch { setError('That image could not be read. Try a JPG or PNG.'); }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.contact_info.trim()) {
      setError('Add a title, location, and contact info to continue.');
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), location: form.location.trim(), contact_info: form.contact_info.trim() });
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} role="dialog" aria-modal="true" aria-label={editing ? 'Edit item' : 'Report an item'}>
        <div className="modal-head">
          <h2>{editing ? 'Edit post' : 'Report an item'}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="segmented" role="group" aria-label="Report type">
          {['Lost', 'Found'].map((t) => (
            <button type="button" key={t} className={form.report_type === t ? 'on' : ''} onClick={() => set('report_type', t)}>
              {t === 'Lost' ? 'I lost something' : 'I found something'}
            </button>
          ))}
        </div>

        <label className="field">Item name
          <input value={form.title} maxLength={100} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Black AquaFlask 32oz" />
        </label>
        <div className="row">
          <label className="field">Category
            <select value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="field">Building / room
            <input value={form.location} maxLength={100} onChange={(e) => set('location', e.target.value)} placeholder="e.g. IT Bldg Room 302" />
          </label>
        </div>
        <label className="field">Description
          <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Color, stickers, marks, time you last saw it" />
        </label>
        <label className="field">Contact info
          <input value={form.contact_info} maxLength={100} onChange={(e) => set('contact_info', e.target.value)} placeholder="Phone, email, or office where the item is kept" />
        </label>

        <div className="field">
          Photo
          <div className="photo-pick">
            {form.image_data && <img src={form.image_data} alt="Preview" />}
            <label className="btn btn-outline">
              {form.image_data ? 'Change photo' : 'Choose photo'}
              <input type="file" accept="image/*" hidden onChange={pickPhoto} />
            </label>
            {form.image_data && <button type="button" className="btn btn-ghost" onClick={() => set('image_data', null)}>Remove</button>}
          </div>
        </div>

        {error && <p className="error" role="alert">{error}</p>}
        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Post item'}</button>
        </div>
      </form>
    </div>
  );
}
