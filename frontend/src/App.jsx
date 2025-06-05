import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import AccountDetail from './pages/AccountDetail';
import GiftCardSummary from './pages/GiftCardSummary';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account/:id" element={<AccountDetail />} />
          <Route path="/summary" element={<GiftCardSummary />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
