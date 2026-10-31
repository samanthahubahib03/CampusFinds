export default function Logo({ size = 28, light = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo">
      <rect width="32" height="32" rx="9" fill={light ? '#ffffff' : '#1e3a8a'} />
      <path d="M16 5.5c-4.2 0-7.4 3.1-7.4 7.2 0 4.9 5.3 9.6 6.8 10.8a1.1 1.1 0 0 0 1.2 0c1.5-1.2 6.8-5.9 6.8-10.8 0-4.100-3.200-7.200-7.400-7.200Z" fill="#f5b301" />
      <circle cx="16" cy="12.7" r="3.300" fill={light ? '#1e3a8a' : '#ffffff'} />
      <rect x="9" y="25" width="14" height="2" rx="1" fill={light ? '#1e3a8a' : '#ffffff'} opacity=".85" />
    </svg>
  );
}
