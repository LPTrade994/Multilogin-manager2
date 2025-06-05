import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const { data = [] } = useQuery({
    queryKey: ['summary'],
    queryFn: () => api.get('/accounts/summary').then(r => r.data)
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Accounts</h1>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(acc => (
            <tr key={acc.id} className="border-t">
              <td className="p-2"><Link to={`/account/${acc.id}`}>{acc.name}</Link></td>
              <td className="p-2">{acc.lastActivity ? new Date(acc.lastActivity).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
