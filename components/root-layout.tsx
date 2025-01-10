import styles from '@/app/layout.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <HeaderNavigation />
    </header>
  );
};

const HeaderLogo = () => {
  return (
    <div className={`${styles.logoContainer} ${styles.headerLogoPadding}`}>
      <Image src="/assets/bytecraft_logo.png" alt="ByteCrate logo" width={70} height={70} />
      <p>ByteCrate</p>
    </div>
  );
};

const HeaderNavigation = () => {
  return (
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
  );
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterLogo />
      <FooterNavigation />
    </footer>
  );
};

const FooterLogo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image src="/assets/bytecraft_logo.png" alt="ByteCrate logo" width={50} height={50} />
      <p>ByteCrate</p>
    </div>
  );
};

const FooterNavigation = () => {
  return (
    <nav className={styles.footerNavigation}>
      <Link href="">About us</Link>
      <Link href="">Contact</Link>
      <Link href="https://github.com/hafemi/bytecrate" target="_blank" rel="noopener noreferrer">
        Github Repository
      </Link>
    </nav>
  );
};