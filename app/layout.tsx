'use client';
import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Image src="/images/temporary_logo.png" alt="ByteBay logo" width={50} height={50} />
        <p>ByteBay</p>
      </div>
      <nav className={styles.footerNavigation}>
        <a href="">About us</a>
        <a href="">Contact</a>
        <a href="https://github.com/hafemi/byte-bay" target="_blank" rel="noopener noreferrer">
          Github Repository
        </a>
      </nav>
    </footer>
  );
};

export const Header = () => {
  return (
    <header className={styles.header}>
      <div
        className={`
        ${styles.logoContainer}
        ${styles.headerLogoPadding}`}
      >
        <Image src="/images/temporary_logo.png" alt="ByteBay logo" width={70} height={70} />
        <p>ByteBay</p>
      </div>
      <nav className={styles.headerNavigation}>
        <Link href="/">Home</Link>
        <div className={styles.dropdown}>
          <a href="">Tools</a>
          <div className={styles.dropdownContent}>
            <a href="/tools/maze-generator">Maze Generator</a>
          </div>
        </div>
        <div className={styles.dropdown}>
          <a href="">Games</a>
          <div className={styles.dropdownContent}>
            <a href="/games/rock-paper-scissors">Rock Paper Scissors</a>
          </div>
        </div>
      </nav>
    </header>
  );
};
