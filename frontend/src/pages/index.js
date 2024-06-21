// File: src/pages/index.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/global.css'; // Import global styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchLotteryData } from '../_app'; // Import fetchLotteryData function

function HomePage() {
    const [lotteryData, setLotteryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await fetchLotteryData();
                setLotteryData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    return (
        <>
            <Head>
                <title>Decentralized Lottery System</title>
                <meta name="description" content="Experience the Decentralized Lottery System powered by Move language and Aptos module." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="container">
                <h1>Welcome to the Decentralized Lottery System</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {lotteryData && (
                    <>
                        <p>Current Lottery Jackpot: {lotteryData.jackpot} ETH</p>
                        <p>Number of Participants: {lotteryData.participants}</p>
                        <p>Next Drawing Date: {new Date(lotteryData.nextDrawDate).toLocaleDateString()}</p>
                        <Link href="/about">
                            <a className="link">Learn More About Us</a>
                        </Link>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
