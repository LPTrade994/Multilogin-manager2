import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api';

export default function GiftCardSummary() {
  const [params, setParams] = useState({ start: '', end: '' });

  const { data } = useQuery({
    queryKey: ['gcs', params],
    queryFn: () => {
      if (!params.start || !params.end) return Promise.resolve({});
      return api.get(`/summary/giftcards`, { params }).then(r => r.data);
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Gift Card Summary</h1>
      <div className="mb-4 space-x-2">
        <input type="date" value={params.start} onChange={e => setParams(p => ({ ...p, start: e.target.value }))} />
        <input type="date" value={params.end} onChange={e => setParams(p => ({ ...p, end: e.target.value }))} />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="p-2 text-left">Country</th>
            <th className="p-2 text-left"># Added</th>
            <th className="p-2 text-left">Value Added</th>
            <th className="p-2 text-left"># Suspended</th>
            <th className="p-2 text-left">Value Suspended</th>
          </tr>
        </thead>
        <tbody>
          {data && Object.entries(data).map(([country, v]) => (
            <tr key={country} className="border-t">
              <td className="p-2">{country}</td>
              <td className="p-2">{v.countAdded}</td>
              <td className="p-2">{v.valueAdded}</td>
              <td className="p-2">{v.countSuspended}</td>
              <td className="p-2">{v.valueSuspended}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
