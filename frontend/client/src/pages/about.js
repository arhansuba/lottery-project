// File: src/pages/about.js

import React from 'react';
import Head from 'next/head';
import '../styles/global.css'; // Import global styles
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutPage() {
    return (
        <>
            <Head>
                <title>About - Decentralized Lottery System</title>
                <meta name="description" content="Learn more about the Decentralized Lottery System powered by Move language and Aptos module." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="container">
                <h1>About the Decentralized Lottery System</h1>
                <p>
                    This decentralized lottery system is built using Move language for smart contracts and integrates with the Aptos module for randomness and yield generation.
                </p>
                <p>
                    The system ensures 100% Return to Player (RTP) by returning the principal amount of the lottery pool to participants. It also utilizes an Actively Validated Service (AVS) to securely manage funds and investments, enhancing transparency and reliability.
                </p>
                <p>
                    The lottery system aims to improve scalability and security within the Ethereum ecosystem through innovative use of blockchain technology.
                </p>
            </main>
            <Footer />
        </>
    );
}

export default AboutPage;
