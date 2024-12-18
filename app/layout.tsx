'use client';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <header className={styles.header}>
      <div
        className={`
        ${styles.logoContainer}
        ${styles.headerLogoPadding}`}
      >
        <Image src="/images/temporary_logo.png" alt="ByteCrate logo" width={70} height={70} />
        <p>ByteCrate</p>
      </div>
      <nav className={styles.headerNavigation}>
        <Link href="/">Home</Link>
        <div className={styles.dropdown}>
          <p>Tools</p>
          <div className={styles.dropdownContent}>
            <Link href="/tools/maze-generator">Maze Generator</Link>
            <Link href="/tools/password-generator">Password Generator</Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <p>Games</p>
          <div className={styles.dropdownContent}>
            <Link href="/games/rock-paper-scissors">Rock Paper Scissors</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Image src="/images/temporary_logo.png" alt="ByteCrate logo" width={50} height={50} />
        <p>ByteCrate</p>
      </div>
      <nav className={styles.footerNavigation}>
        <Link href="">About us</Link>
        <Link href="">Contact</Link>
        <Link href="https://github.com/hafemi/byte-bay" target="_blank" rel="noopener noreferrer">
          Github Repository
        </Link>
      </nav>
    </footer>
  );
};
