'use client';
import localFont from "next/font/local";
import "./globals.css";
import Image from 'next/image';
import styles from './layout.module.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
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
      <a href="">About us</a>
      <a href="">Contact</a>
      <a href="https://github.com/hafemi/byte-bay" target="_blank" rel="noopener noreferrer">
        Github Repository
      </a>
    </footer>
  );
};
