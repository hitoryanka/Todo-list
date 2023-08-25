import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center">
      <div className="sm:max-w-2xl grow">{children}</div>
    </main>
  );
}
