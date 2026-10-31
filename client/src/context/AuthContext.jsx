import { createContext, useContext, useState } from 'react';

// TEMPORARY: demo accounts for the login dropdown.
// Replace with POST /api/login (School ID + password) once the backend is ready.
export const DEMO_USERS = [
  { user_id: 1, full_name: 'Juan Dela Cruz', student_id_num: '2023-00123', email: 'juan@campus.edu', role: 'Student' },
  { user_id: 99, full_name: 'Campus Security Office', student_id_num: 'ADMIN-001', email: 'security@campus.edu', role: 'Admin' },
];

const AuthContext = createContext(null);
const KEY = 'campusfinds_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  });

  const login = (userId) => {
    const u = DEMO_USERS.find((d) => d.user_id === Number(userId));
    if (!u) return null;
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
