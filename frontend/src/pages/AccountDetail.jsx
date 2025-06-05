import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function AccountDetail() {
  const { id } = useParams();
  const { data: account } = useQuery({
    queryKey: ['account', id],
    queryFn: () => api.get(`/accounts/${id}`).then(r => r.data)
  });
  const { data: balances } = useQuery({
    queryKey: ['balances', id],
    queryFn: () => api.get(`/accounts/${id}/balances`).then(r => r.data)
  });

  if (!account) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{account.name}</h1>
      <pre className="mb-4">{JSON.stringify(balances, null, 2)}</pre>
      <ul>
        {account.transactions.map(tx => (
          <li key={tx.id}>{tx.date} - {tx.type} - {tx.value}</li>
        ))}
      </ul>
    </div>
  );
}
