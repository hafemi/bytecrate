import { Footer, Header } from '@/lib/components/root-layout';
import { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.page}>
        <Header />
        <div className={styles.main}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'ByteCrate',
  description: 'Collection of Games and Tools',
};