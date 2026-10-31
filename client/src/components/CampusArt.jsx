// Flat illustration of a campus. Replaced by a real photo when CAMPUS_PHOTO is set in config.js.
export default function CampusArt() {
  const win = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    win.push(<rect key={`l${r}${c}`} x={92 + c * 34} y={262 + r * 44} width="16" height="26" rx="8" fill="#dbe7ff" />);
    win.push(<rect key={`r${r}${c}`} x={352 + c * 34} y={262 + r * 44} width="16" height="26" rx="8" fill="#dbe7ff" />);
  }
  return (
    <svg viewBox="0 0 560 420" role="img" aria-label="Illustration of a campus building" className="campus-art">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfe0ff" /><stop offset="1" stopColor="#f4f8ff" /></linearGradient>
      </defs>
      <rect width="560" height="420" fill="url(#sky)" />
      <circle cx="466" cy="78" r="34" fill="#f5b301" opacity=".95" />
      <g fill="#fff"><ellipse cx="110" cy="84" rx="44" ry="14" /><ellipse cx="140" cy="72" rx="30" ry="12" /><ellipse cx="400" cy="140" rx="38" ry="11" /></g>
      <path d="M0 300 Q140 250 280 290 T560 280 V420 H0Z" fill="#c9dbf7" />
      {/* wings */}
      <rect x="70" y="238" width="170" height="112" fill="#fff" stroke="#c7d2e8" />
      <rect x="320" y="238" width="170" height="112" fill="#fff" stroke="#c7d2e8" />
      <rect x="64" y="228" width="182" height="14" fill="#1e3a8a" />
      <rect x="314" y="228" width="182" height="14" fill="#1e3a8a" />
      {win}
      {/* centre block + tower */}
      <rect x="230" y="190" width="100" height="160" fill="#fff" stroke="#c7d2e8" />
      <rect x="252" y="96" width="56" height="100" fill="#fff" stroke="#c7d2e8" />
      <path d="M244 96 L280 56 L316 96Z" fill="#1e3a8a" />
      <rect x="277" y="40" width="6" height="18" fill="#1e3a8a" />
      <circle cx="280" cy="128" r="16" fill="#fff" stroke="#1e3a8a" strokeWidth="4" />
      <path d="M280 118v10l7 4" stroke="#1e3a8a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M222 192 L280 160 L338 192Z" fill="#1e3a8a" />
      <g fill="#e8eefb" stroke="#c7d2e8">{[0, 1, 2, 3].map((i) => <rect key={i} x={240 + i * 20} y="200" width="10" height="150" />)}</g>
      <rect x="262" y="296" width="36" height="54" rx="18" fill="#14275f" />
      <rect x="214" y="346" width="132" height="10" fill="#cbd5e1" />
      <rect x="200" y="356" width="160" height="10" fill="#d9e1ee" />
      {/* path + trees */}
      <path d="M250 366 L310 366 L360 420 L200 420Z" fill="#e7d9b5" />
      {[[40, 330], [520, 330], [150, 372], [410, 372]].map(([x, y]) => (
        <g key={x}><rect x={x - 3} y={y - 8} width="6" height="34" fill="#7a5a3a" /><circle cx={x} cy={y - 20} r="24" fill="#2f8f5b" /><circle cx={x + 12} cy={y - 8} r="16" fill="#3fa56d" /></g>
      ))}
    </svg>
  );
}
