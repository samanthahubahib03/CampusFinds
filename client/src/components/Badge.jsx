export default function Badge({ item }) {
  if (item.status === 'Claimed') return <span className="badge badge-claimed">Claimed</span>;
  return item.report_type === 'Lost'
    ? <span className="badge badge-lost">Lost</span>
    : <span className="badge badge-found">Found</span>;
}
