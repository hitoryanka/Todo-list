'use client';

import { store } from '@/redux-toolkit/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className="h-full">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
