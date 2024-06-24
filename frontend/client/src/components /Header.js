// File: components/Header.js

import React from 'react';
import Link from 'next/link'; // Importing Link from Next.js for client-side navigation
import styles from '../styles/Lottery.module.css'; // Importing styles from Lottery.module.css

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <a>
                        <img src="/images/logo.png" alt="Lottery System Logo" />
                    </a>
                </Link>
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/about"><a>About</a></Link></li>
                    <li><Link href="/faq"><a>FAQ</a></Link></li>
                    <li><Link href="/contact"><a>Contact</a></Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
