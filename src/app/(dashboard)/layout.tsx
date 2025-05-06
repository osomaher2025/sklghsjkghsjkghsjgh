
'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Create a client
const queryClient = new QueryClient();

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DashboardLayout>{children}</DashboardLayout>
      </QueryClientProvider>
    </Provider>
  );
}
