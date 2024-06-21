// File: components/Footer.js

import React from 'react';
import styles from '../styles/Lottery.module.css'; // Importing styles from Lottery.module.css

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; 2024 Lottery System. All rights reserved.</p>
                <ul className={styles.footerLinks}>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
