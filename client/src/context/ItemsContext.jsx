import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';

export const CATEGORIES = ['ID / Wallet', 'Gadgets', 'Tumbler / Personal', 'Others'];

const daysAgo = (d, h = 0) => new Date(Date.now() - d * 864e5 - h * 36e5).toISOString();
const base = { image_data: null, status: 'Unclaimed' };

const SEED = [
  { ...base, item_id: 1, user_id: 2, poster_name: 'Maria Santos', title: 'Black AquaFlask 32oz', report_type: 'Lost', category: 'Tumbler / Personal', location: 'IT Bldg Room 302', description: 'Matte black with a small star sticker near the base.', contact_info: '0917 555 0142', created_at: daysAgo(0, 3) },
  { ...base, item_id: 2, user_id: 3, poster_name: 'Paolo Reyes', title: 'Student ID (Engineering)', report_type: 'Found', category: 'ID / Wallet', location: 'Library, 2nd floor', description: 'Found near the study carrels. Name starts with “A”.', contact_info: 'Library front desk', created_at: daysAgo(1) },
  { ...base, item_id: 3, user_id: 1, poster_name: 'Juan Dela Cruz', title: 'Casio fx-991EX calculator', report_type: 'Lost', category: 'Gadgets', location: 'Science Bldg Room 114', description: 'Gray case with initials “JDC” on the back.', contact_info: 'juan@campus.edu', created_at: daysAgo(2) },
  { ...base, item_id: 4, user_id: 2, poster_name: 'Maria Santos', title: 'Blue umbrella', report_type: 'Found', category: 'Others', location: 'Main Gate guardhouse', description: 'Left at the guardhouse, wooden handle.', contact_info: 'Security office', created_at: daysAgo(3) },
  { ...base, item_id: 5, user_id: 3, poster_name: 'Paolo Reyes', title: '32GB flash drive', report_type: 'Found', category: 'Gadgets', location: 'Computer Lab 2', description: 'Red Kingston drive with a lanyard.', contact_info: '0928 555 0199', status: 'Claimed', created_at: daysAgo(5) },
];

const ItemsContext = createContext(null);
const KEY = 'campusfinds_items';

export function ItemsProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || SEED; } catch { return SEED; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage full */ }
  }, [items]);

  // Each function below maps to one REST route. Swap the body for a fetch() call later.
  const createItem = (data) => {                       // POST /api/items
    const item = {
      ...data,
      item_id: Date.now(),
      user_id: user.user_id,
      poster_name: user.full_name,
      status: 'Unclaimed',
      created_at: new Date().toISOString(),
    };
    setItems((prev) => [item, ...prev]);
    return item;
  };
  const updateItem = (id, patch) =>                    // PUT /api/items/:id
    setItems((prev) => prev.map((i) => (i.item_id === id ? { ...i, ...patch } : i)));
  const removeItem = (id) =>                           // DELETE /api/items/:id
    setItems((prev) => prev.filter((i) => i.item_id !== id));
  const getItem = (id) => items.find((i) => i.item_id === Number(id)); // GET /api/items/:id

  return (
    <ItemsContext.Provider value={{ items, createItem, updateItem, removeItem, getItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);
