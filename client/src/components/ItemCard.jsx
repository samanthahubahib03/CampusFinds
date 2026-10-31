import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import { timeAgo } from '../utils/helpers.js';

export default function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.item_id}`} className={`card ${item.status === 'Claimed' ? 'is-claimed' : ''}`}>
      <div className="card-media">
        {item.image_data
          ? <img src={item.image_data} alt={item.title} loading="lazy" />
          : <span className="card-ph">{item.category}</span>}
        <Badge item={item} />
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <p className="muted">{item.location}</p>
        <p className="card-time">{timeAgo(item.created_at)}</p>
      </div>
    </Link>
  );
}
