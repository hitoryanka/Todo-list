import { Provider } from 'react-redux';
import './globals.css';
import { Inter } from 'next/font/google';
import { store } from '@/redux-toolkit/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your Space',
  description: 'Settle your thoughts here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${inter.className} font-light`}>{children}</body>
      </Provider>
    </html>
  );
}
