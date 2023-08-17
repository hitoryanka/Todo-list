'use client';

import { store } from '@/redux-toolkit/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="flex justify-center">
      <body className="h-full sm:max-w-2xl grow">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
