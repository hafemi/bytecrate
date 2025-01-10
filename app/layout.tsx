import { Footer, Header } from '@/components/root-layout';
import { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${styles.page} ${inter.className}`}>
        <Header />
        <div className={styles.main}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'ByteCrate',
  description: 'Collection of Games and Tools',
};
