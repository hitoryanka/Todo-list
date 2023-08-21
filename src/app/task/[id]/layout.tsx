'use client';

import { store } from '@/redux-toolkit/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <main className="flex justify-center">
        <div className="sm:max-w-2xl grow">{children}</div>
      </main>
    </Provider>
  );
}
